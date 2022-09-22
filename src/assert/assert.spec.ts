import { assert } from './assert';

describe('assert()', () => {
	it('evaluates booleans', () => {
		expect(() => assert(true, 'code')).not.toThrow();
		expect(() => assert(false, 'code')).toThrow('Client Error: code');
	});

	it('complains when wrong condition is provided', () => {
		expect(() => assert(null as any, '')).toThrow('Argument "condition" must be a boolean.');
	});

	it('complains when given an empty code.', () => {
		expect(() => assert(true, '')).toThrow('Argument "code" must be provided.');
	});

	it('complains when given wrong code code.', () => {
		expect(() => assert(true, undefined as any)).toThrow('Argument "code" must be provided.');
		expect(() => assert(true, {} as any)).toThrow('Argument "code" must be provided.');
	});
});
