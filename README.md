<a href="https://www.typescriptlang.org/">
  <img
    src="https://avatars.githubusercontent.com/u/189666396?s=150&u=9d55b1eb4ce258974ead76bf07ccf49ef0eb0ea7&v=4"
    title="The typescript package enhances the development of typescript-based applications by providing well-structured, reusable, easy-to-use packages."
  />
</a>

## typescript-package/map

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

A lightweight **TypeScript** library for enhanced `map` management.

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - [`CoreMap`](#coremap)
  - [`DataMap`](#datamap)
  - [`FactoryMap`](#factorymap)
  - [`WeakDataMap`](#weakdatamap)
- [Contributing](#contributing)
- [Support](#support)
- [Code of Conduct](#code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)

## Installation

### 1. Install peer `data` dependencies

```bash
npm install @typescript-package/data --save-peer
```

### 2. Install the `map` package

```bash
npm install @typescript-package/map --save-peer
```

## Api

```typescript
import {
  // Abstract.
  CoreMap,
  MapOnHook,

  // Class.
  DataMap,
  FactoryMap,
  WeakDataMap,
} from '@typescript-package/map';
```

### `CoreMap`

The abstract core class is designed for building `Map` and `DataCore` related classes.

```typescript
import { CoreMap } from '@typescript-package/data';
```

### `DataMap`

The `DataMap` is a concrete class that extends `Map` and encapsulates its data within a `DataCore` store, providing additional data management capabilities.

```typescript
import { DataMap } from '@typescript-package/data';

// Define a `DataCore` implementation for holding a data in `DataMap`.
export class CustomMapData<Key, Value> extends Data<Map<Key, Value>> {
  constructor(initialValue?: Map<Key, Value>) {
    super(initialValue ?? new Map());
  }
}

// Create a new `DataMap` instance with predefined entries and customized data holder.
export const dataMap = new DataMap
// <string, number, CustomMapData<string, number>> previous approach, now captured.
(
  [
    ["one", 1],
    ["two", 2],
    ["three", 3],
  ],
  // new CustomMapData() // previous approach
  CustomMapData // new approach
); // const dataMap: DataMap<string, number, CustomMapData<string, number>>

// Check the `CustomMapData`.
console.log(`Data holder of \`CustomMapData\`:`, dataMap.data); // Output: CustomMapData {#locked: false, #value: Value}

// Get the `CustomMapData` value.
console.log(`Data holder of \`CustomMapData\` value:`, dataMap.data.value); // Output: Map(3) {'one' => 1, 'two' => 2, 'three' => 3}

// Log the size of the map
console.log("Size:", dataMap.size); // Output: Size: 3

// Get a value from the map
console.log("Value for 'two':", dataMap.get("two")); // Output: Value for 'two': 2

// Check if a key exists
console.log("Has 'three'?", dataMap.has("three")); // Output: Has 'three'? true

// Set a new key-value pair
dataMap.set("four", 4);
console.log("Size after set:", dataMap.size); // Output: Size after set: 4

// Iterate over entries
dataMap.forEach((value, key) => console.log(`${key}: ${value}`));
// Output:
// one: 1
// two: 2
// three: 3
// four: 4

// Delete an entry
dataMap.delete("one");
console.log("Size after delete:", dataMap.size); // Output: Size after delete: 3

// Clear the map
dataMap.clear();
console.log("Size after clear:", dataMap.size); // Output: Size after clear: 0

```

### `FactoryMap`

```typescript
import { FactoryMap } from '@typescript-package/data';

// Define custom `Map`.
export class CustomMap<Key, Value> extends Map<Key, Value> {
  public newMethod() {}
  constructor(entries?: [Key, Value][]) {
    super(entries);
  }
}

// Define data storage to store custom map.
export class TestCustomMapData<Key, Value> extends Data<CustomMap<Key, Value>> {
  constructor(initialValue?: CustomMap<Key, Value>) {
    super(initialValue ?? new CustomMap());
  }
}

// Initialize the factory map with custom map and data.
const factoryMap = new FactoryMap(
  [['a', {x: 1}], ['b', {x: 2}]],

  // Use custom `Map`
  CustomMap,

  // Use custom storage for custom map.
  TestCustomMapData,
  {
    // Define function for the default value.
    defaultValue: () => ({x: 0}),

    // Define cloner by using the `structuredClone`.
    cloner: (value) => structuredClone(value),
  }
); // const factoryMap: FactoryMap<string, { x: number; }, CustomMap<string, { x: number }>, TestCustomMapData<string, { x: number; }>>

console.log(factoryMap.get('c')); // { x: 0 }
console.log(factoryMap.get('b')); // { x: 2 }
console.log(factoryMap.get('a')); // { x: 1 }
console.debug(factoryMap.sort()); // sort.

```

### `WeakDataMap`

The `WeakDataMap` class is a concrete class that stores data in a static `WeakMap`.

```typescript
import { WeakDataMap } from '@typescript-package/data';

// Create an instance of `WeakDataMap`.
const weakDataMap = new WeakDataMap([
  ['one', 1],
  ['two', 2],
  ['three', 3],
]);


// Get the value from `WeakData` static.
console.log(`data: `, WeakData.get(weakDataMap.data)); // Output: Map(3) {'one' => 1, 'two' => 2, 'three' => 3}

// Get a value by key
console.log(weakDataMap.get('two')); // Output: 2

// Add a new key-value pair
weakDataMap.set('four', 4);

// Check if a key exists
console.log(weakDataMap.has('four')); // Output: true

// Delete a key
weakDataMap.delete('one');

// Iterate over entries
for (const [key, value] of weakDataMap.entries()) {
  console.log(key, value);
}

// Output:
// two 2
// three 3
// four 4

```

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- [Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)

Thanks for your support!

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

## Packages

- **[@typescript-package/affix](https://github.com/typescript-package/affix)**: A **lightweight TypeScript** library for the affix - prefix and suffix.
- **[@typescript-package/are](https://github.com/typescript-package/are)**: Type-safe `are` checkers for validating value types in TypeScript.
- **[@typescript-package/data](https://github.com/typescript-package/data)**: A lightweight **TypeScript** library for basic data management.
- **[@typescript-package/descriptor](https://github.com/typescript-package/descriptor)**: A **lightweight TypeScript** library for property descriptor.
- **[@typescript-package/guard](https://github.com/typescript-package/guard)**: Type-safe guards for guarding the value types in TypeScript.c
- **[@typescript-package/history](https://github.com/typescript-package/history)**: A **TypeScript** package for tracking history of values.
- **[@typescript-package/is](https://github.com/typescript-package/is)**: Type-safe is checkers for validating value types in TypeScript.
- **[@typescript-package/name](https://github.com/typescript-package/name)**: A **lightweight TypeScript** library for the name with prefix and suffix.
- **[@typescript-package/property](https://github.com/typescript-package/property)**: A **lightweight TypeScript** package with features to handle object properties.
- **[@typescript-package/queue](https://github.com/typescript-package/queue)**: A **lightweight TypeScript** library for managing various queue and stack structures.
- **[@typescript-package/range](https://github.com/typescript-package/range)**: A **lightweight TypeScript** library for managing various types of ranges.
- **[@typescript-package/regexp](https://github.com/typescript-package/regexp)**: A **lightweight TypeScript** library for **RegExp**.
- **[@typescript-package/state](https://github.com/typescript-package/state)**: Simple state management for different types in **TypeScript**.
- **[@typescript-package/storage](https://github.com/typescript-package/storage)**: The storage of data under allowed names.
- **[@typescript-package/type](https://github.com/typescript-package/type)**: Utility types to enhance and simplify **TypeScript** development.
- **[@typescript-package/wrapper](https://github.com/typescript-package/wrapper)**: A **lightweight TypeScript** library to wrap the text with the opening and closing chars.

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/data
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/data
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/data
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/data
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/data/issues
  [typescript-package-forks]: https://github.com/typescript-package/data/network
  [typescript-package-license]: https://github.com/typescript-package/data/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/data/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fdata.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fdata

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
