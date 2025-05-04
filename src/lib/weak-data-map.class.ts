// Class.
import { DataMap } from './data-map.class';
import { WeakData } from '@typescript-package/data';
/**
 * @description The `WeakDataMap` class is a concrete class that stores data in a static `WeakMap`.
 * @export
 * @class WeakDataMap
 * @template Key 
 * @template Value 
 * @extends {DataMap<Key, Value, WeakData<Map<Key, Value>>>}
 */
export class WeakDataMap<Key, Value> extends DataMap<Key, Value, WeakData<Map<Key, Value>>> {
  /**
   * @description Returns the `string` tag representation of the `WeakDataMap` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag](): string {
    return WeakDataMap.name;
  }

  /**
   * Creates an instance of `WeakDataMap`.
   * @constructor
   * @param {?[Key, Value][]} [entries] 
   */
  constructor(entries?: [Key, Value][]) {
    super(entries, WeakData);
  }
}
