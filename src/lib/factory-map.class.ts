import {
  // Abstract.
  DataCore,
  // Class.
  Data,
  // Type.
  DataConstructorInput,
  // Interface.
  MapTypeConstructor,
} from '@typescript-package/data';
// Abstract.
import { CoreMap } from './core-map.abstract';
/**
 * @description
 * @export
 * @class FactoryMap
 * @template Key 
 * @template Value 
 * @template {Map<Key, Value>} [MapType=Map<Key, Value>] 
 * @template {DataCore<MapType>} [DataType=Data<MapType>] 
 * @extends {CoreMap<Key, Value, MapType, DataType>}
 */
export class FactoryMap<
  Key,
  Value,
  MapType extends Map<Key, Value> = Map<Key, Value>,
  DataType extends DataCore<MapType> = Data<MapType>,
> extends CoreMap<Key, Value, MapType, DataType> {
  /**
   * @description
   * @public
   * @static
   * @template {PropertyKey} Key 
   * @template Value 
   * @template {Map<Key, Value>} [MapType=Map<Key, Value>] 
   * @template {DataCore<MapType>} [DataType=Data<MapType>] 
   * @param {Record<Key, Value>} obj 
   * @param {?MapTypeConstructor<Key, Value, MapType>} [map] 
   * @param {?DataConstructorInput<MapType, DataType>} [data] 
   * @param {{
   *       defaultValue?: () => Value;
   *       cloner?: (value: Value) => Value;
   *     }} [param0={}] 
   * @param {() => Value} param0.defaultValue 
   * @param {(value: Value) => Value} param0.cloner 
   * @returns {FactoryMap<Key, Value, MapType, DataType>} 
   */
  public static fromObject<
    Key extends PropertyKey,
    Value,
    MapType extends Map<Key, Value> = Map<Key, Value>,
    DataType extends DataCore<MapType> = Data<MapType>
  >(
    obj: Record<Key, Value>,
    map?: MapTypeConstructor<Key, Value, MapType>,
    data?: DataConstructorInput<MapType, DataType>,
    { defaultValue, cloner }:
    {
      defaultValue?: () => Value;
      cloner?: (value: Value) => Value;
    } = {}
  ): FactoryMap<Key, Value, MapType, DataType> {
    return new FactoryMap(
      Object.entries(obj) as [Key, Value][],
      map,
      data,
      { cloner, defaultValue }
    );
  }

  /**
   * @description Returns the `string` tag representation of the `FactoryMap` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public override get [Symbol.toStringTag](): string {
    return FactoryMap.name;
  }

  /**
   * @description Returns the privately stored data class.
   * @public
   * @readonly
   * @type {DataType}
   */
  public override get data() {
    return super.data;
  }

  /**
   * @description Returns the default value.
   * @public
   * @readonly
   * @type {Value | undefined}
   */
  public get defaultValue() {
    return this.#defaultValue?.();
  }

  /**
   * @description Privately stored function to set the default value in missing keys.
   * @public
   * @readonly
   * @type {() => Value}
   */
  #defaultValue?: () => Value;

  /**
   * @description Privately stored cloner function to clone the returned value.
   * @public
   * @readonly
   * @type {(value: Value) => Value}
   */
  #cloner?: (value: Value) => Value;

  /**
   * @description Privately stored comparator for sorting.
   * @param {[Key, Value]} a 
   * @param {[Key, Value]} b 
   * @returns {(a: [Key, Value], b: [Key, Value]) => number} 
   */
  #comparator: (a: [Key, Value], b: [Key, Value]) => number = (a, b) => `${a}`.localeCompare(`${b}`);

  /**
   * @description Whether the map is ordered.
   * @type {boolean}
   */
  #ordered;

  /**
   * Creates an instance of `FactoryMap`.
   * @constructor
   * @param {?[Key, Value][]} [entries] 
   * @param {?MapTypeConstructor<Key, Value, MapType>} [map] 
   * @param {?DataConstructorInput<MapType, DataType>} [data] 
   * @param {{
   *       cloner?: (value: Value) => Value,
   *       comparator?: ((a: [Key, Value], b: [Key, Value]) => number),
   *       defaultValue?: () => Value,
   *       ordered?: boolean;
   *     }} [param0={}] 
   * @param {(value: Value) => Value} param0.cloner 
   * @param {(a: [Key, Value], b: [Key, Value]) => number} param0.comparator 
   * @param {() => Value} param0.defaultValue 
   * @param {boolean} param0.ordered 
   */
  constructor(
    entries?: [Key, Value][],
    map?: MapTypeConstructor<Key, Value, MapType>,
    data?: DataConstructorInput<MapType, DataType>,
    {cloner, comparator, defaultValue, ordered}: {
      cloner?: (value: Value) => Value,
      comparator?: ((a: [Key, Value], b: [Key, Value]) => number),
      defaultValue?: () => Value,
      ordered?: boolean;
    } = {}
  ) {
    super(entries, map, data);
    this.#cloner = cloner;
    this.#defaultValue = defaultValue;
    this.#ordered = ordered;
    typeof comparator === 'function' && (this.#comparator = comparator);
    (Array.isArray(entries) && entries.length > 0 && ordered) && this.sort();
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key 
   * @returns {(Value | undefined)} 
   */
  public override get(key: Key): Value | undefined {
    (!super.has(key) && typeof this.#defaultValue === 'function') && super.data.value.set(key, this.#defaultValue());
    const value = super.get(key);
    return typeof this.#cloner === 'function' && value ? this.#cloner(value) : value;
  }

  /**
   * @description Gets the cloner function, to use for e.g. `structuredClone`.
   * @public
   * @returns {((value: Value) => Value) | undefined} 
   */
  public getCloner() {
    return this.#cloner;
  }

  /**
   * @description Returns the default value function.
   * @public
   * @returns {(() => Value) | undefined}
   */
  public getDefaultValue() {
    return this.#defaultValue;
  }

  /**
   * @inheritdoc
   * @public
   * @param {Key} key 
   * @param {Value} value 
   * @returns {this} 
   */
  public override set(key: Key, value: Value) {
    super.set(key, value);
    this.#ordered === true && this.sort();
    return this;
  }

  /**
   * @description Sets the cloner function, to use for e.g. `structuredClone`.
   * @public
   * @param {(value: Value) => Value} clonerFn
   * @returns {this} The current instance of `FactoryMap`.
   * @example
   * ```ts
   * const map = new FactoryMap<string, number>();
   * map.setCloner((value) => structuredClone(value));
   * console.log(map.get('key')); // undefined
   * map.set('key', { a: 1 });
   * console.log(map.get('key')); // { a: 1 }
   * map.set('key', { a: 2 });
   * console.log(map.get('key')); // { a: 2 }
   * ```
   */
  public setCloner(clonerFn: (value: Value) => Value): this {
    typeof clonerFn === 'function' && (this.#cloner = clonerFn);
    return this;
  }

  /**
   * @description Sets the compare function used in sorting.
   * @public
   * @param {(a: [Key, Value], b: [Key, Value]) => number} compareFn
   * @returns {this}
   */
  public setComparator(compareFn: (a: [Key, Value], b: [Key, Value]) => number): this {
    typeof compareFn === 'function' && (this.#comparator = compareFn);
    return this;
  }

  /**
   * @description Sets the default value function.
   * @public
   * @param {() => Value} valueFn
   * @returns {this} The current instance of `FactoryMap`.
   * @example
   * ```ts
   * const map = new FactoryMap<string, number>();
   * map.setDefaultValue(() => 0);
   * console.log(map.get('key')); // 0
   * map.set('key', 1);
   * console.log(map.get('key')); // 1
   * ```
   */
  public setDefaultValue(valueFn: () => Value): this {
    this.#defaultValue = valueFn;
    return this;
  }

  /**
   * @description Sets whether the map should sort automatically after each `set`.
   * @public
   * @param {boolean} ordered
   * @returns {this}
   */
  public setOrdered(ordered: boolean): this {
    this.#ordered = ordered;
    return this;
  }

  /**
   * @description Sorts the map with a stored or given comparator.
   * @public
   * @param {(a: [Key, Value], b: [Key, Value]) => number} [compareFn=this.#comparator] 
   * @returns {this} 
   */
  public sort(compareFn: (a: [Key, Value], b: [Key, Value]) => number = this.#comparator): this {
    const entries = [...super.entries()];
    entries.length > 0 && (
      super.clear(),
      entries.sort((a, b) => compareFn(a, b)).forEach(([k, v]) => this.set(k, v))
    );
    return this;
  }
}
