import { isPromise } from './is-promise';

describe('is promise', () => {
	it('new promise', () => {
		expect(isPromise(new Promise(() => ''))).toBe(true);
	});

	it('function', () => {
		expect(isPromise(() => { })).toBe(false);
	});

	it('arrow function', () => {
		expect(isPromise(() => { })).toBe(false);
	});

	it('new function', () => {
		// eslint-disable-next-line no-new-func
		expect(isPromise(new Function())).toBe(false);
	});

	it('function ref', () => {
		const fn = () => { };
		expect(isPromise(fn)).toBe(false);
	});

	it('object', () => {
		expect(isPromise({})).toBe(false);
	});

	it('new object', () => {
		// eslint-disable-next-line no-new-object
		expect(isPromise(new Object())).toBe(false);
	});

	it('string', () => {
		expect(isPromise('')).toBe(false);
	});

	it('number', () => {
		expect(isPromise(1)).toBe(false);
	});
});
