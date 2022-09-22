import { Maybe } from '../types/maybe';
import { isOfType } from './is-of-type';
import { OfType } from './type-of';

/**
 * Checks if value is valid url
 */
export function isUrl(value: unknown): value is string {
	let url: Maybe<URL> = null;

	if (isOfType(OfType.string, value)) {
		try {
			url = new URL(value);
		} catch {
			return false;
		}
	}

	return url instanceof URL && (url.protocol === 'http:' || url.protocol === 'https:');
}
