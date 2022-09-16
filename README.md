# @opi_pib/ts-utility

-   [@opi_pib/ts-utility](#frontendts-utility)
    -   [Assert](#assert)
        -   [Usage](#usage)
            -   [TypeScript](#typescript)
    -   [Logic](#logic)
        -   [isDefined](#isdefined)
        -   [isFunction](#isfunction)
        -   [isInstanceOf](#isinstanceof)
        -   [isObject](#isobject)
        -   [isPromise](#ispromise)
        -   [isUrl](#isurl)
        -   [typeOf](#typeof)
        -   [isOfType](#isoftype)
    -   [Models](#models)
        -   [Entity](#entity)
        -   [Value object](#value-object)
    -   [Types](#types)
        -   [Maybe<T>](#maybet)
    -   [Utils](#utils)
        -   [stripHtml](#striphtml)

## Assert

### Usage

```typescript
function add(x, y) {
	always(typeof x === "number", "Argument 'x' has to be a number.");
	always(typeof y === "number", "Argument 'y' has to be a number.");
	return x + y;
}
```

always() function throw an Error if the condition is false:

```typescript
always(1 > 0); // ok
always(1 < 0); // throws Error
```

never() does the same but in reverse:

```typescript
never(1 > 0); // throws Error
never(1 < 0); // ok
```

#### TypeScript

function always() are typed to assert that the condition you pass them are true, which gives you certainty that your variable is of a given type at runtime.

```typescript
export declare function always(
	condition: boolean,
	code: string
): asserts condition;
```

```typescript
const x: unknown = someUntypedFunction();
always(typeof x === "string");
const y = x.toUpperCase(); // TypeScript knows that x must be a string, your IDE can suggest toUpperCase() method
```

## Logic

### isDefined

Checks if value exists (is not null or undefined)

```typescript
isDefined("123"); // true
isDefined(""); // true
isDefined(0); // true
isDefined(null); // false
isDefined(undefined); // false
```

### isFunction

Checks if value is function

```typescript
isFunction(() => {}); // true
isFunction(""); // false
isFunction(new Promise(() => "")); // false
```

### isInstanceOf

Checks if value is instance of value

```typescript
class TestClass {}
isInstanceOf(TestClass, new TestClass()); // true
isInstanceOf(TestClass)(new TestClass()); // true
isInstanceOf(TestClass, 1); // false
```

### isObject

Checks if value is object

```typescript
isObject({}); // true
isObject([]); // false
isObject(() => {}); // false
isObject(new Promise(() => "")); // false
```

### isPromise

Checks if value is promise

```typescript
isPromise({}); // false
isPromise(new Promise(() => "")); // true
```

### isUrl

Checks if value is valid url

```typescript
isUrl("www.google.com"); // false
isUrl("https://google.com"); // true
```

### typeOf

Return type of provided value

```typescript
typeOf(new Date()); // OfType.date
typeOf(true); // OfType.boolean
```

### isOfType

Checks if provided value is of provided type

```typescript
isOfType(OfType.date, new Date()); // true
isOfType(OfType.number, 0); // true
```

## Models

### Entity

Entities are objects that we determine their equality through their identifier.

Example:

```typescript
interface IdProps {
	id: string;
}

class Id extends ValueObject<IdProps> {
	private constructor(protected readonly props: IdProps) {
		super(props);
	}

	static create(id: string): Id {
		return new Id({ id });
	}
}

interface TestedEntityDto {
	id: Id;
	value: string;
}

interface TestedEntityProps {
	id: Id;
	value: string;
}

class TestedEntity extends Entity<TestedEntityProps> {
	private constructor(protected readonly props: TestedEntityProps) {
		super(props);
	}

	static create(testedEntityDto: TestedEntityDto): TestedEntity {
		return new TestedEntity(testedEntityDto);
	}
}

it("should equals by id", () => {
	const id1 = Id.create("123");
	const id2 = Id.create("123");
	const a = TestedEntity.create({ id: id1, value: "example1" });
	const b = TestedEntity.create({ id: id2, value: "example2" });

	expect(a.equals(b)).toBe(true);
});

it("should not equal if id1 not equals id2", () => {
	const id1 = Id.create("123");
	const id2 = Id.create("1234");
	const a = TestedEntity.create({ id: id1, value: "example" });
	const b = TestedEntity.create({ id: id2, value: "example" });

	expect(a.equals(b)).toBe(false);
});
```

### Value object

ValueObjects are objects that we determine their equality through their structrual property.

Example:

```typescript
interface TestedValueObjectProps {
	name: string;
	city: {
		name: string;
	};
}

class TestedValueObject extends ValueObject<TestedValueObjectProps> {
	private constructor(protected readonly props: TestedValueObjectProps) {
		super(props);
	}

	static create(name: string, cityName: string): TestedValueObject {
		return new TestedValueObject({ name, city: { name: cityName } });
	}
}

it("should equals by structure", () => {
	const a = TestedValueObject.create("name", "cityName");
	const b = TestedValueObject.create("name", "cityName");

	expect(a.equals(b)).toBe(true);
});

it("should not equals if structure is different", () => {
	const a = TestedValueObject.create("name", "cityName1");
	const b = TestedValueObject.create("name", "cityName2");

	expect(a.equals(b)).toBe(false);
});
```

## Types

### Maybe<T>

Marks value as nullable, it can be T, undefined, null.
It forces null check on every usage of value.

```typescript
interface Example {
	a: string;
	b?: Maybe<string>;
}

const obj: Example = {
	a: "string",
	b: "maybeString",
};

const { a, b } = obj;

a.length; // Ok
b.length; // Error, b can be undefined

if (b != null) {
	b.length; // Ok
}
```

## Utils

### stripHtml

Removes HTML tags from string

```typescript
stripHtml('<h1>Title</h1> <p>content</p><img src="">'); // 'Title content'
```
