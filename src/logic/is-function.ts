import { isOfType } from './is-of-type';
import { OfType } from './type-of';

/**
 * Checks if value is function
 */
export function isFunction(value: unknown): value is () => Promise<boolean> | boolean {
	return isOfType(OfType.function, value);
}
