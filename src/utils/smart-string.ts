export class SmartString {
	private _str: string[];

	constructor(private str: string) {
		// Przekształcamy ciąg na poprawnie zliczane jednostki znaków
		this._str = Array.from(str);

		// Zwracamy obiekt Proxy, aby umożliwić indeksowanie tablicowe
		return new Proxy(this, {
			get: (target: SmartString, prop: string | symbol) => {
				if (typeof prop === 'string' && !Number.isNaN(Number(prop))) {
					const index = Number(prop);
					return index in target._str ? target._str[index] : undefined;
				}

				return target[prop as keyof SmartString];
			},
		});
	}

	get length(): number {
		return this._str.length;
	}

	toString(): string {
		return this._str.join('');
	}

	[Symbol.iterator](): IterableIterator<string> {
		return this._str.values();
	}

	charAt(index: number): string | undefined {
		return this._str[index];
	}

	substring(start: number, end = this.length): SmartString {
		start = Math.max(0, Math.min(this.length, start));
		end = Math.max(0, Math.min(this.length, end));
		if (start > end) {
			[start, end] = [end, start];
		}

		return new SmartString(this._str.slice(start, end).join(''));
	}

	slice(start: number, end: number = this.length): SmartString {
		start = start < 0 ? Math.max(this.length + start, 0) : Math.min(start, this.length);
		end = end < 0 ? Math.max(this.length + end, 0) : Math.min(end, this.length);

		return new SmartString(this._str.slice(start, end).join(''));
	}

	splice(start: number, deleteCount: number, ...items: string[]): SmartString {
		start = Math.max(0, Math.min(this.length, start));
		deleteCount = Math.max(0, Math.min(this.length - start, deleteCount));

		const removed = this._str.splice(start, deleteCount, ...Array.from(items));

		return new SmartString(removed.join(''));
	}

	// eslint-disable-next-line no-undef
	[index: number]: string | undefined;
}
