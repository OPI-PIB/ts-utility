import { OfType, typeOf } from './type-of';

describe('typeOf', () => {
	it('date', () => {
		expect(typeOf(new Date())).toBe(OfType.date);
	});

	it('boolean', () => {
		expect(typeOf(true)).toBe(OfType.boolean);
	});

	it('number', () => {
		expect(typeOf(0)).toBe(OfType.number);
	});

	it('-number', () => {
		expect(typeOf(-0)).toBe(OfType.number);
	});

	it('NaN', () => {
		expect(typeOf(NaN)).toBe(OfType.number);
	});

	it('Infinity', () => {
		expect(typeOf(Infinity)).toBe(OfType.number);
	});

	it('function', () => {
		expect(typeOf(() => { })).toBe(OfType.function);
	});

	it('arrow function', () => {
		expect(typeOf((x: unknown) => x)).toBe(OfType.function);
	});

	it('object', () => {
		expect(typeOf({})).toBe(OfType.object);
	});

	it('string', () => {
		expect(typeOf('')).toBe(OfType.string);
	});

	it('regexp', () => {
		expect(typeOf(/someRegularExpression/i)).toBe(OfType.regexp);
	});

	it('new Regexp', () => {
		expect(typeOf(new RegExp('someRegularExpression', 'i'))).toBe(OfType.regexp);
	});

	it('array', () => {
		expect(typeOf([])).toBe(OfType.array);
	});

	it('new Array', () => {
		expect(typeOf(new Array(0))).toBe(OfType.array);
	});

	it('null', () => {
		expect(typeOf(null)).toBe(OfType.null);
	});
});
