import { stripHtml } from './strip-html';

describe('stripHtml', () => {
	it('number', () => {
		expect(() => stripHtml(0 as any)).toThrow('Provided value is not a string');
	});

	it('object', () => {
		expect(() => stripHtml({ a: 1 } as any)).toThrow();
	});

	it('string', () => {
		const str = 'Testing string, aaa:';
		expect(stripHtml(str)).toBe(str);
	});

	it('html', () => {
		expect(stripHtml('<h1>Title</h1> <p>content</p><img src="">')).toBe('Title content');
	});
});
