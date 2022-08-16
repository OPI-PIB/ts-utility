/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import { OfType, typeOf } from './type-of';

/**
 * Checks if provided value is of provided type
 */
export function isOfType(type: OfType.date, value: unknown): value is Date;
export function isOfType(type: OfType.boolean, value: unknown): value is boolean;
export function isOfType(type: OfType.number, value: unknown): value is number;
export function isOfType(type: OfType.function, value: unknown): value is Function;
export function isOfType(type: OfType.object, value: unknown): value is Record<string, any>;
export function isOfType(type: OfType.string, value: unknown): value is string;
export function isOfType(type: OfType.regexp, value: unknown): value is RegExp;
export function isOfType(type: OfType.array, value: unknown): value is Array<any>;
export function isOfType(type: OfType.null, value: unknown): value is null;
export function isOfType(type: OfType, value: unknown) {
	return typeOf(value) === type;
}
