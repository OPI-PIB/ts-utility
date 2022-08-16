import { isFunction } from './is-function';

describe('is function', () => {
	it('function', () => {
		expect(isFunction(() => { })).toBe(true);
	});

	it('arrow function', () => {
		expect(isFunction(() => { })).toBe(true);
	});

	it('new function', () => {
		// eslint-disable-next-line no-new-func
		expect(isFunction(new Function())).toBe(true);
	});

	it('function ref', () => {
		const fn = () => { };
		expect(isFunction(fn)).toBe(true);
	});

	it('object', () => {
		expect(isFunction({})).toBe(false);
	});

	it('new object', () => {
		// eslint-disable-next-line no-new-object
		expect(isFunction(new Object())).toBe(false);
	});

	it('string', () => {
		expect(isFunction('')).toBe(false);
	});

	it('number', () => {
		expect(isFunction(1)).toBe(false);
	});

	it('new promise', () => {
		expect(isFunction(new Promise(() => ''))).toBe(false);
	});
});
