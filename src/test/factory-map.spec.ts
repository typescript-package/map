import { Data } from "@typescript-package/data";
import { FactoryMap } from "../lib";

export class CustomMap<Key, Value> extends Map<Key, Value> {
  public newMethod() {}
  constructor(entries?: [Key, Value][]) {
    super(entries);
  }
}

export class TestCustomMapData<Key, Value> extends Data<CustomMap<Key, Value>> {
  constructor(initialValue?: CustomMap<Key, Value>) {
    super(initialValue ?? new CustomMap());
  }
}

const factoryMap = new FactoryMap(
  [['a', {x: 1}], ['b', {x: 2}]],

  // Use custom `Map`
  CustomMap,

  // Use custom storage for custom map.
  [TestCustomMapData, 'a', 'b'],
  {
    // Define function for the default value.
    defaultValue: () => ({x: 0}),

    // Define cloner by using the `structuredClone`.
    cloner: (value) => structuredClone(value),
  }
); // const factoryMap: FactoryMap<string, { x: number; }, CustomMap<string, { x: number }>, TestCustomMapData<string, { x: number; }>>

console.group('FactoryMap');


console.log(factoryMap.get('c')); // { x: 0 }
console.log(factoryMap.get('b')); // { x: 2 }
console.log(factoryMap.get('a')); // { x: 1 }
console.debug(factoryMap.sort())

console.groupEnd();
