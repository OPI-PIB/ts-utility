import { isDefined } from '../logic/is-defined';
import { isOfType } from '../logic/is-of-type';
import { OfType } from '../logic/type-of';

/**
 * Assert condition and throw Client Error with custom code if condition is false
 */
export function assert(condition: boolean, code: string): asserts condition {
	if (!isOfType(OfType.boolean, condition)) {
		throw new TypeError('Argument \'condition\' must be a boolean.');
	}

	if (!isDefined(code) || !isOfType(OfType.string, code) || (isOfType(OfType.string, code) && code.length < 1)) {
		throw new TypeError('Argument \'code\' must be provided.');
	}

	if (condition === false) {
		throw new Error(`Client Error: ${code}`);
	}
}
