import { Data } from '@typescript-package/data';
import { DataMap } from "../lib";

// Define a `DataCore` implementation for holding a data in `DataMap`.
export class CustomMapData<Key, Value> extends Data<Map<Key, Value>> {
  constructor(initialValue?: Map<Key, Value>, ...args: any[]) {
    super(initialValue ?? new Map());
    console.log(`...args: any[]`, args);
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
  [CustomMapData, 'a', 'b', 1] // new approach
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

console.groupEnd();
