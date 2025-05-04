import { WeakData } from "@typescript-package/data";
import { WeakDataMap } from "../lib";

console.group(`WeakDataMap`);

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

console.groupEnd();
