import { Is } from '../logic/is';

/**
 * Assert condition and throw Client Error with custom code if condition is false
 */
export function assert(condition: boolean, code: string): asserts condition {
	if (!Is.boolean(condition)) {
		throw new TypeError('Argument "condition" must be a boolean.');
	}

	if (!Is.defined(code) || !Is.string(code) || (Is.string(code) && code.length === 0)) {
		throw new TypeError('Argument "code" must be provided.');
	}

	if (condition === false) {
		throw new Error(`Client Error: ${code}`);
	}
}
