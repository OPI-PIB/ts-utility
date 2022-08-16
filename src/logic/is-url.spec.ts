/* eslint-disable no-script-url */
import { isUrl } from './is-url';

describe('is url', () => {
	it('number', () => {
		expect(isUrl(0)).toBe(false);
	});

	it('object', () => {
		expect(isUrl({ a: 1 })).toBe(false);
	});

	it('string', () => {
		expect(isUrl('aaa')).toBe(false);
	});

	it('www.google.com', () => {
		expect(isUrl('www.google.com')).toBe(false);
	});

	it('javascript:void(0)', () => {
		expect(isUrl('javascript:void(0)')).toBe(false);
	});

	it('http://localhost', () => {
		expect(isUrl('http://localhost')).toBe(true);
	});

	it('http://localhost:4200', () => {
		expect(isUrl('http://localhost:4200')).toBe(true);
	});

	it('http://..', () => {
		expect(isUrl('http://..')).toBe(true);
	});

	it('https://google..com', () => {
		expect(isUrl('https://google..com')).toBe(true);
	});

	it('https://google.com', () => {
		expect(isUrl('https://google.com')).toBe(true);
	});

	it('https://google.com:4200/test?val=1', () => {
		expect(isUrl('https://google.com:4200/test?val=1')).toBe(true);
	});
});
