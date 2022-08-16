/**
 * Removes HTML tags from string
 */
export function stripHtml(value: string): string {
	if (typeof value !== 'string') {
		throw new Error('Provided value is not a string');
	}

	let result = '';

	try {
		result = new DOMParser().parseFromString(value, 'text/html').body.textContent || result;
	} catch {
		throw new Error('Provided value can\'t be parsed');
	}

	return result;
}
