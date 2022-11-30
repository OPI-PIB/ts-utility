import { isOfType } from './is-of-type';
import { Maybe } from '../types/maybe';
import { OfType } from './type-of';

type Newable<T> = new (...args: any[]) => T;

export class Is {
	static date(value: unknown): value is Date {
		return isOfType(OfType.date, value);
	}

	static boolean(value: unknown): value is boolean {
		return isOfType(OfType.boolean, value);
	}

	static number(value: unknown): value is number {
		return isOfType(OfType.number, value);
	}

	static function(value: unknown): value is Function {
		return isOfType(OfType.function, value);
	}

	static object(value: unknown): value is Record<string, any> {
		return isOfType(OfType.object, value);
	}

	static string(value: unknown): value is string {
		return isOfType(OfType.string, value);
	}

	static regexp(value: unknown): value is RegExp {
		return isOfType(OfType.regexp, value);
	}

	static array(value: unknown): value is any[] {
		return isOfType(OfType.array, value);
	}

	static null(value: unknown): value is null {
		return isOfType(OfType.null, value);
	}

	static defined<T>(value: Maybe<T>): value is T {
		return value !== undefined && value !== null;
	}

	static promise<T>(value: unknown): value is Promise<T> {
		return value instanceof Promise;
	}

	static url(value: unknown): value is string {
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

	static instanceOf<T>(className: Newable<T>): (value: unknown) => value is T;

	// eslint-disable-next-line no-dupe-class-members
	static instanceOf<T>(className: Newable<T>, value: unknown): value is T;

	// eslint-disable-next-line no-dupe-class-members
	static instanceOf<T>(className: Newable<T>, value?: unknown) {
		if (value === undefined) {
			return (v: unknown): v is T => v instanceof className;
		}

		return value instanceof className;
	}
}
