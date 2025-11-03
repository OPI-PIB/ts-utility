import { describe, expect, it } from 'vitest';

import { always } from './always.js';

describe('always()', () => {
	it('evaluates booleans', () => {
		expect(() => always(true, 'test')).not.toThrow();
		expect(() => always(false, 'test')).toThrow();
	});

	it('complains when given an empty code.', () => {
		expect(() => always(false, '')).toThrow(/code/i);
	});
});
