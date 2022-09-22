/* eslint-disable max-classes-per-file */
import { ValueObject } from './value-object';

interface TestedValueObjectProps {
	name: string;
	city: {
		name: string;
	};
}

class TestedValueObject extends ValueObject<TestedValueObjectProps> {
	private constructor(protected readonly props: TestedValueObjectProps) {
		super(props);
	}

	static create(name: string, cityName: string): TestedValueObject {
		return new TestedValueObject({ name, city: { name: cityName } });
	}
}

interface TestNestedProps {
	value: TestedValueObject;
}

class TestNested extends ValueObject<TestNestedProps> {
	private constructor(protected readonly props: TestNestedProps) {
		super(props);
	}

	static create(value: TestedValueObject): TestNested {
		return new TestNested({ value });
	}
}

interface TestMultiProps {
	values: TestNested[];
}

class TestMulti extends ValueObject<TestMultiProps> {
	private constructor(protected readonly props: TestMultiProps) {
		super(props);
	}

	static create(values: TestNested[]): TestMulti {
		return new TestMulti({ values });
	}
}

describe('ValueObject', () => {
	it('should props be frozen', () => {
		const a = TestedValueObject.create('name', 'cityName');

		expect(Object.isFrozen((a as any).props)).toBe(true);
	});

	it('should equals by reference', () => {
		const a = TestedValueObject.create('name', 'cityName');
		const b = a;

		expect(a.equals(b)).toBe(true);
	});

	it('should equals by structure', () => {
		const a = TestedValueObject.create('name', 'cityName');
		const b = TestedValueObject.create('name', 'cityName');

		expect(a.equals(b)).toBe(true);
	});

	it('should not equals if structure is different', () => {
		const a = TestedValueObject.create('name', 'cityName1');
		const b = TestedValueObject.create('name', 'cityName2');

		expect(a.equals(b)).toBe(false);
	});

	it('should not equals if compared object is null', () => {
		const a = TestedValueObject.create('name', 'cityName');

		expect(a.equals(null as any)).toBe(false);
	});

	it('should not equals if compared object is not ValueObject', () => {
		const a = TestedValueObject.create('name', 'cityName');

		expect(a.equals('string' as any)).toBe(false);
	});

	it('should equals if nested ValueObject are equals', () => {
		const result = [
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
		];
		const expected = [
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
		];

		let allEquals: boolean = true;
		result.forEach((item, index) => {
			if (expected[index].equals(item) === false) {
				allEquals = false;
			}
		});

		expect(allEquals).toBe(true);
	});

	it('should not equals if nested ValueObject are equals', () => {
		const result = [
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name2', 'cityName')),
		];
		const expected = [
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name3', 'cityName')),
		];

		let allEquals: boolean = true;
		result.forEach((item, index) => {
			if (expected[index].equals(item) === false) {
				allEquals = false;
			}
		});

		expect(allEquals).toBe(false);
	});

	it('should equals if multiple nested ValueObjects are equals', () => {
		const result = TestMulti.create([
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
		]);
		const expected = TestMulti.create([
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
		]);

		expect(result.equals(expected)).toBe(true);
	});

	it('should not equals if multiple nested ValueObjects are not equals', () => {
		const result = TestMulti.create([
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
		]);
		const expected = TestMulti.create([
			TestNested.create(TestedValueObject.create('name1', 'cityName')),
			TestNested.create(TestedValueObject.create('name2', 'cityName')),
		]);

		expect(result.equals(expected)).toBe(false);
	});
});
