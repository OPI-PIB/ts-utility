/* eslint-disable no-redeclare */

type Newable<T> = new (...args:any[]) => T;

/**
 * Checks if value is instance of value
 */
export function isInstanceOf<T>(className: Newable<T>): (value: unknown) => value is T;
export function isInstanceOf<T>(className: Newable<T>, value: unknown): value is T;
export function isInstanceOf<T>(className: Newable<T>, value?: unknown) {
	if (value === undefined) {
		return (v: unknown): v is T => v instanceof className;
	}

	return value instanceof className;
}
