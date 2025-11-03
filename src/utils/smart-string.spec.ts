import { describe, expect, it } from 'vitest';

import { SmartString } from './smart-string.js';

describe('SmartString', () => {
	it('length property', () => {
		const text = new SmartString('𝑛𝑛𝑛');
		expect(text.length).toBe(3);
	});

	it('length property with empty string', () => {
		const text = new SmartString('');
		expect(text.length).toBe(0);
	});

	it('toString method', () => {
		const text = new SmartString('𝑛𝑛𝑛');
		expect(text.toString()).toBe('𝑛𝑛𝑛');
	});

	it('toString method with empty string', () => {
		const text = new SmartString('');
		expect(text.toString()).toBe('');
	});

	it('charAt method', () => {
		const text = new SmartString('𝑛𝑛𝑛');
		expect(text.charAt(0)).toBe('𝑛');
		expect(text.charAt(1)).toBe('𝑛');
		expect(text.charAt(2)).toBe('𝑛');
		expect(text.charAt(3)).toBeUndefined();
	});

	it('substring method', () => {
		const text = new SmartString('𝑛𝑛𝑛');
		expect(text.substring(0, 2).toString()).toBe('𝑛𝑛');
		expect(text.substring(1, 3).toString()).toBe('𝑛𝑛');
		expect(text.substring(1).toString()).toBe('𝑛𝑛');
		expect(text.substring(-2, 1).toString()).toBe('𝑛');
		expect(text.substring(3, 0).toString()).toBe('𝑛𝑛𝑛');
		expect(text.substring(4, 2).toString()).toBe('𝑛');
	});

	it('slice method', () => {
		const text = new SmartString('𝑛𝑛𝑛');
		expect(text.slice(0, 2).toString()).toBe('𝑛𝑛');
		expect(text.slice(-2).toString()).toBe('𝑛𝑛');
		expect(text.slice(1, -1).toString()).toBe('𝑛');
		expect(text.slice(-3, 1).toString()).toBe('𝑛');
		expect(text.slice(10).toString()).toBe('');
	});

	it('splice method', () => {
		const text = new SmartString('𝑛𝑛𝑛');

		// Remove one character
		const removed = text.splice(1, 1);
		expect(removed.toString()).toBe('𝑛');
		expect(text.toString()).toBe('𝑛𝑛');

		// Add new characters
		text.splice(1, 0, '𝑥', '𝑦');
		expect(text.toString()).toBe('𝑛𝑥𝑦𝑛');

		// Replace characters
		text.splice(1, 2, '𝑧');
		expect(text.toString()).toBe('𝑛𝑧𝑛');

		// Remove without adding
		const removedAgain = text.splice(0, 2);
		expect(removedAgain.toString()).toBe('𝑛𝑧');
		expect(text.toString()).toBe('𝑛');

		// Add without removing
		text.splice(1, 0, '𝑎', '𝑏');
		expect(text.toString()).toBe('𝑛𝑎𝑏');
	});

	it('Symbol.iterator', () => {
		const text = new SmartString('𝑛𝑛𝑛');
		expect([...text]).toEqual(['𝑛', '𝑛', '𝑛']);
	});

	it('array-like indexing', () => {
		const text = new SmartString('𝑛𝑛𝑛');
		expect(text[0]).toBe('𝑛');
		expect(text[1]).toBe('𝑛');
		expect(text[2]).toBe('𝑛');
		expect(text[3]).toBeUndefined();
	});

	it('concatenation', () => {
		const text1 = new SmartString('𝑛𝑛');
		const text2 = new SmartString('𝑥𝑥');
		expect(text1.toString() + text2.toString()).toBe('𝑛𝑛𝑥𝑥');
	});
});
