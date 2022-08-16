// eslint-disable-next-line max-classes-per-file
import { isInstanceOf } from './is-instance-of';

class TestClass {}

describe('isInstanceOf', () => {
	it('isInstanceOf class', () => {
		expect(isInstanceOf(TestClass, new TestClass())).toBe(true);
	});

	it('isInstanceOf class curry', () => {
		expect(isInstanceOf(TestClass)(new TestClass())).toBe(true);
	});

	it('isInstanceOf other class', () => {
		class OtherTestClass {}
		expect(isInstanceOf(TestClass)(new OtherTestClass())).toBe(false);
	});

	it('isInstanceOf null', () => {
		expect(isInstanceOf(TestClass)(null)).toBe(false);
	});

	it('isInstanceOf undefined', () => {
		expect(isInstanceOf(TestClass)(undefined)).toBe(false);
	});

	it('isInstanceOf []', () => {
		expect(isInstanceOf(TestClass)([])).toBe(false);
	});

	it('isInstanceOf Array', () => {
		expect(isInstanceOf(TestClass)(new Array(1))).toBe(false);
	});

	it('isInstanceOf number', () => {
		expect(isInstanceOf(TestClass)(1)).toBe(false);
	});

	it('isInstanceOf string', () => {
		expect(isInstanceOf(TestClass)('')).toBe(false);
	});
});
