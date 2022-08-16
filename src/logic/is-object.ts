import { isOfType } from './is-of-type';
import { OfType } from './type-of';

/**
 * Checks if value is object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
	return isOfType(OfType.object, value);
}
