import { describe, expect, it } from 'vitest';

import { stripHtml } from './strip-html.js';

describe('stripHtml', () => {
	it('number', () => {
		expect(() => stripHtml(0 as any)).toThrow(/Provided value is not a string/);
	});

	it('object', () => {
		expect(() => stripHtml({ a: 1 } as any)).toThrow();
	});

	it('string', () => {
		const str = 'Testing string, aaa:';
		expect(stripHtml(str)).toBe(str);
	});

	it('html', () => {
		const input = '<h1>Title</h1> <p>content</p><img src="">';
		const expected = 'Title content';
		expect(stripHtml(input)).toBe(expected);
	});
});
