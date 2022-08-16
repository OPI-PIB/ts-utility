import { OfType } from './type-of';
import { isOfType } from './is-of-type';

describe('isOfType', () => {
	it('date', () => {
		expect(isOfType(OfType.date, new Date())).toBe(true);
	});

	it('boolean', () => {
		expect(isOfType(OfType.boolean, true)).toBe(true);
	});

	it('number', () => {
		expect(isOfType(OfType.number, 0)).toBe(true);
	});

	it('-number', () => {
		expect(isOfType(OfType.number, -0)).toBe(true);
	});

	it('NaN', () => {
		expect(isOfType(OfType.number, NaN)).toBe(true);
	});

	it('Infinity', () => {
		expect(isOfType(OfType.number, Infinity)).toBe(true);
	});

	it('function', () => {
		expect(isOfType(OfType.function, () => { })).toBe(true);
	});

	it('arrow function', () => {
		expect(isOfType(OfType.function, (x: unknown) => x)).toBe(true);
	});

	it('object', () => {
		expect(isOfType(OfType.object, {})).toBe(true);
	});

	it('string', () => {
		expect(isOfType(OfType.string, '')).toBe(true);
	});

	it('regexp', () => {
		expect(isOfType(OfType.regexp, /someRegularExpression/i)).toBe(true);
	});

	it('array', () => {
		expect(isOfType(OfType.array, [])).toBe(true);
	});

	it('null', () => {
		expect(isOfType(OfType.null, null)).toBe(true);
	});
});
