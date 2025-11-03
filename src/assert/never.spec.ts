import { describe, expect, test } from 'vitest';

import { never } from './never.js';

describe('never()', () => {
	test('evaluates booleans', () => {
		expect(() => never(false, 'test')).not.toThrow();
		expect(() => never(true, 'test')).toThrow();
	});

	test('complains when given an empty code.', () => {
		expect(() => never(true, '')).toThrow(/code/i);
	});
});
