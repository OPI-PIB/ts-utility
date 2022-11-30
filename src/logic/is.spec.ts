// eslint-disable-next-line max-classes-per-file
import { Is } from './is';

describe('Is', () => {
	it('date', () => {
		expect(Is.date(new Date())).toBe(true);
	});

	it('boolean', () => {
		expect(Is.boolean(true)).toBe(true);
	});

	it('string', () => {
		expect(Is.string('')).toBe(true);
	});

	it('null', () => {
		expect(Is.null(null)).toBe(true);
	});

	describe('regexp', () => {
		it('regexp', () => {
			expect(Is.regexp(/someRegularExpression/i)).toBe(true);
		});

		it('new Regexp', () => {
			expect(Is.regexp(new RegExp('someRegularExpression', 'i'))).toBe(true);
		});
	});

	describe('array', () => {
		it('array', () => {
			expect(Is.array([])).toBe(true);
		});

		it('new Array', () => {
			expect(Is.array(new Array(0))).toBe(true);
		});
	});

	describe('number', () => {
		it('number', () => {
			expect(Is.number(0)).toBe(true);
		});

		it('-number', () => {
			expect(Is.number(-0)).toBe(true);
		});

		it('NaN', () => {
			expect(Is.number(NaN)).toBe(true);
		});

		it('Infinity', () => {
			expect(Is.number(Infinity)).toBe(true);
		});
	});

	describe('function', () => {
		it('function', () => {
			// eslint-disable-next-line prefer-arrow-callback
			expect(Is.function(function f() { })).toBe(true);
		});

		it('arrow function', () => {
			expect(Is.function((x: unknown) => x)).toBe(true);
		});

		it('new function', () => {
			// eslint-disable-next-line no-new-func
			expect(Is.function(new Function())).toBe(true);
		});

		it('function ref', () => {
			const fn = () => { };
			expect(Is.function(fn)).toBe(true);
		});

		it('object', () => {
			expect(Is.function({})).toBe(false);
		});

		it('new object', () => {
			// eslint-disable-next-line no-new-object
			expect(Is.function(new Object())).toBe(false);
		});

		it('string', () => {
			expect(Is.function('')).toBe(false);
		});

		it('number', () => {
			expect(Is.function(1)).toBe(false);
		});

		it('new promise', () => {
			expect(Is.function(new Promise(() => ''))).toBe(false);
		});
	});

	describe('object', () => {
		it('object', () => {
			expect(Is.object({})).toBe(true);
		});

		it('new object', () => {
			// eslint-disable-next-line no-new-object
			expect(Is.object(new Object())).toBe(true);
		});

		it('function', () => {
			expect(Is.object(() => { })).toBe(false);
		});

		it('arrow function', () => {
			expect(Is.object(() => { })).toBe(false);
		});

		it('new function', () => {
			// eslint-disable-next-line no-new-func
			expect(Is.object(new Function())).toBe(false);
		});

		it('function ref', () => {
			const fn = () => { };
			expect(Is.object(fn)).toBe(false);
		});

		it('string', () => {
			expect(Is.object('')).toBe(false);
		});

		it('number', () => {
			expect(Is.object(1)).toBe(false);
		});

		it('array', () => {
			expect(Is.object([])).toBe(false);
		});

		it('new promise', () => {
			expect(Is.object(new Promise(() => ''))).toBe(false);
		});
	});

	describe('promise', () => {
		it('new promise', () => {
			expect(Is.promise(new Promise(() => ''))).toBe(true);
		});

		it('function', () => {
			expect(Is.promise(() => { })).toBe(false);
		});

		it('arrow function', () => {
			expect(Is.promise(() => { })).toBe(false);
		});

		it('new function', () => {
			// eslint-disable-next-line no-new-func
			expect(Is.promise(new Function())).toBe(false);
		});

		it('function ref', () => {
			const fn = () => { };
			expect(Is.promise(fn)).toBe(false);
		});

		it('object', () => {
			expect(Is.promise({})).toBe(false);
		});

		it('new object', () => {
			// eslint-disable-next-line no-new-object
			expect(Is.promise(new Object())).toBe(false);
		});

		it('string', () => {
			expect(Is.promise('')).toBe(false);
		});

		it('number', () => {
			expect(Is.promise(1)).toBe(false);
		});
	});

	describe('defined', () => {
		it('null', () => {
			expect(Is.defined(null)).toBe(false);
		});

		it('undefined', () => {
			expect(Is.defined(undefined)).toBe(false);
		});

		it('[]', () => {
			expect(Is.defined([])).toBe(true);
		});

		it('{}', () => {
			expect(Is.defined({})).toBe(true);
		});

		it('() => null', () => {
			expect(Is.defined(() => null)).toBe(true);
		});

		it('0', () => {
			expect(Is.defined(0)).toBe(true);
		});

		it('\'\'', () => {
			expect(Is.defined('')).toBe(true);
		});
	});

	describe('url', () => {
		it('number', () => {
			expect(Is.url(0)).toBe(false);
		});

		it('object', () => {
			expect(Is.url({ a: 1 })).toBe(false);
		});

		it('string', () => {
			expect(Is.url('aaa')).toBe(false);
		});

		it('www.google.com', () => {
			expect(Is.url('www.google.com')).toBe(false);
		});

		// eslint-disable-next-line no-script-url
		it('javascript:void(0)', () => {
			// eslint-disable-next-line no-script-url
			expect(Is.url('javascript:void(0)')).toBe(false);
		});

		it('http://localhost', () => {
			expect(Is.url('http://localhost')).toBe(true);
		});

		it('http://localhost:4200', () => {
			expect(Is.url('http://localhost:4200')).toBe(true);
		});

		it('http://..', () => {
			expect(Is.url('http://..')).toBe(true);
		});

		it('https://google..com', () => {
			expect(Is.url('https://google..com')).toBe(true);
		});

		it('https://google.com', () => {
			expect(Is.url('https://google.com')).toBe(true);
		});

		it('https://google.com:4200/test?val=1', () => {
			expect(Is.url('https://google.com:4200/test?val=1')).toBe(true);
		});
	});

	describe('instanceOf', () => {
		class TestClass { }

		it('class', () => {
			expect(Is.instanceOf(TestClass, new TestClass())).toBe(true);
		});

		it('class curry', () => {
			expect(Is.instanceOf(TestClass)(new TestClass())).toBe(true);
		});

		it('other class', () => {
			class OtherTestClass { }
			expect(Is.instanceOf(TestClass)(new OtherTestClass())).toBe(false);
		});

		it('null', () => {
			expect(Is.instanceOf(TestClass)(null)).toBe(false);
		});

		it('undefined', () => {
			expect(Is.instanceOf(TestClass)(undefined)).toBe(false);
		});

		it('[]', () => {
			expect(Is.instanceOf(TestClass)([])).toBe(false);
		});

		it('Array', () => {
			expect(Is.instanceOf(TestClass)(new Array(1))).toBe(false);
		});

		it('number', () => {
			expect(Is.instanceOf(TestClass)(1)).toBe(false);
		});

		it('string', () => {
			expect(Is.instanceOf(TestClass)('')).toBe(false);
		});
	});
});
