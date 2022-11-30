# @opi_pib/ts-utility

-   [@opi_pib/ts-utility](#frontendts-utility)
    -   [Assert](#assert)
        -   [Usage](#usage)
            -   [TypeScript](#typescript)
    -   [Logic](#logic)
        -   [Is](#is)
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

### Is

Static methods of this class will check type of provided value

### Is.defined

```typescript
Is.defined("123"); // true
Is.defined(null); // false
Is.defined(undefined); // false
```

### Is.function

Checks if value is function

```typescript
Is.function(() => {}); // true
Is.function(""); // false
Is.function(new Promise(() => "")); // false
```

### Is.instanceOf

Checks if value is instance of value

```typescript
class TestClass {}
Is.InstanceOf(TestClass, new TestClass()); // true
Is.InstanceOf(TestClass)(new TestClass()); // true
Is.InstanceOf(TestClass, 1); // false
```

### Is.object

Checks if value is object

```typescript
Is.object({}); // true
Is.object([]); // false
Is.object(() => {}); // false
Is.object(new Promise(() => "")); // false
```

### Is.promise

Checks if value is promise

```typescript
Is.promise({}); // false
Is.promise(new Promise(() => "")); // true
```

### Is.url

Checks if value is valid url

```typescript
Is.url("www.google.com"); // false
Is.url("https://google.com"); // true
```

### Other types

Checks if provided value is of provided type

```typescript
Is.date(new Date()); // true
Is.boolean(true); // true
Is.string(""); // true
Is.null(null); // true
Is.regexp(/someRegularExpression/i); // true
Is.regexp(new RegExp("someRegularExpression", "i")); // true
Is.array([]); // true
Is.number(0); // true
Is.number(NaN); // true
Is.number(Infinity); // true
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
