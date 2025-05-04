import {
  // Abstract.
  DataCore,

  // Class.
  Data,

  // Constant
  SymbolValue,

  // Type.
  DataConstructorInput,

  // Interface.
  MapTypeConstructor
} from '@typescript-package/data';
// Abstract.
import { MapOnHook } from './map-on-hook.abstract';
/**
 * @description The abstract core class for building customizable `Map` and `DataCore` related classes.
 * @export
 * @abstract
 * @class CoreMap
 * @template Key 
 * @template Value 
 * @template {Map<Key, Value>} [MapType=Map<Key, Value>] The type of `Map`.
 * @template {DataCore<MapType>} [DataType=Data<MapType>] The `Data` storage type of `Map` type.
 * @extends {MapOnHook<Key, Value, DataType>}
 */
export abstract class CoreMap<
  Key,
  Value,
  MapType extends Map<Key, Value> = Map<Key, Value>,
  DataType extends DataCore<MapType> = Data<MapType>,
> extends MapOnHook<Key, Value, DataType> {
  /**
   * @description Returns the `string` tag representation of the `CoreMap` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public get [Symbol.toStringTag](): string {
    return CoreMap.name;
  }

  /**
   * @description Returns the privately stored data class.
   * @public
   * @readonly
   * @type {DataType}
   */
  public get data() {
    return this.#data;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {number}
   */
  public get size() {
    return this.#data.value.size;
  }

  /**
   * @description A privately stored data holder of generic type variable `DataType` for the `Map`.
   * @type {DataType}
   */
  #data: DataType;
  
  /**
   * Creates an instance of `CoreMap` child class.
   * @constructor
   * @param {?[Key, Value][]} [entries] Initial value for `Map`.
   * @param {?MapTypeConstructor<Key, Value, MapType>} [map] The map of generic type variable `MapType` for `Map` value.
   * @param {?DataConstructorInput<MapType, DataType>} [data] The data store of generic type variable `DataType` for `Map` value.
   */
  constructor(
    entries?: [Key, Value][],
    map?: MapTypeConstructor<Key, Value, MapType>,
    data?: DataConstructorInput<MapType, DataType>
  ) {
    super();
    this.#data = new (Array.isArray(data) ? data[0] : data ?? Data)(
      new (map ?? Map<Key, Value> as unknown as MapTypeConstructor<Key, Value, MapType>)(entries),
      ...Array.isArray(data) ? data.slice(1) : []
    ) as unknown as DataType;
  }

  /**
   * @description Access to the readonly map by using a symbol.
   * @public
   * @returns {Readonly<MapType>} 
   */
  public [SymbolValue](): Readonly<MapType> {
    return this.#data.value;
  }

  /**
   * Clears all entries.
   * @inheritdoc
   * @public
   * @returns {this} 
   */
  public clear(): this {
    this.onClear?.(this.#data);
    this.#data.value.clear();
    return this;
  }

  /**
   * Deletes a value from the `key`.
   * @inheritdoc
   * @public
   * @param {Key} key The key to delete.
   * @returns {boolean} 
   */
  public delete(key: Key): boolean {
    return this.#data.value.delete(key);
  }

  /**
   * @inheritdoc
   */
  public entries(): IterableIterator<[Key, Value]> {
    return this.#data.value.entries();
  }

  /**
   * @inheritdoc
   * @public
   * @param {(value: Value, key: Key, map: Map<Key, Value>) => void} callbackfn 
   * @param {?*} [thisArg] 
   * @returns {this} 
   */
  public forEach(callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void, thisArg?: any): this {
    this.#data.value.forEach(callbackfn, thisArg);
    return this;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key The key to get the value.
   */
  public get(key: Key): Value | undefined {
    return this.onGet?.(key, this.#data), this.#data.value.get(key);
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key The key to check.
   * @returns {boolean} 
   */
  public has(key: Key): boolean {
    return this.onGet?.(key, this.#data), this.#data.value.has(key);
  }

  /**
   * @inheritdoc
   */
  public keys(): MapIterator<Key> {
    return this.#data.value.keys();
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key The key under which the `value` set.
   * @param {Value} value The value of `Value` type.
   * @returns {this} The `this` current instance for chaining.
   */
  public set(key: Key, value: Value): this {
    this.onSet?.(key, value, this.#data.value.get(key)!, this.#data);
    this.#data.value.set(key, value);
    return this;
  }

  /**
   * @inheritdoc
   */
  public values(): MapIterator<Value> {
    return this.#data.value.values();
  }
}
