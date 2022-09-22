export enum OfType {
	date = 'date',
	boolean = 'boolean',
	number = 'number',
	function = 'function',
	object = 'object',
	string = 'string',
	regexp = 'regexp',
	array = 'array',
	null = 'null',
}

/**
 * Return type of provided value
 */
export function typeOf(value: unknown): OfType {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() as OfType;
}
