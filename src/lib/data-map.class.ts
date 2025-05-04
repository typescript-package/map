// Class.
import { Data, DataCore, DataConstructorInput } from '@typescript-package/data';
// Abstract.
import { CoreMap } from './core-map.abstract';
/**
 * @description The `DataMap` is a concrete class that extends `CoreMap` and encapsulates its data within a `DataCore` store, providing additional data management capabilities.
 * @export
 * @class DataMap
 * @template Key 
 * @template Value 
 * @template {DataCore<Map<Key, Value>>} [DataType=Data<Map<Key, Value>>] 
 * @extends {CoreMap<Key, Value, Map<Key, Value>, DataType>}
 */
export class DataMap<
  Key,
  Value,
  DataType extends DataCore<Map<Key, Value>> = Data<Map<Key, Value>>,
> extends CoreMap<Key, Value, Map<Key, Value>, DataType> {
  /**
   * @description 
   * @public
   * @static
   * @template {PropertyKey} Key 
   * @template Value 
   * @template {DataCore<Map<Key, Value>>} [DataType=Data<Map<Key, Value>>] 
   * @param {Record<Key, Value>} obj 
   * @param {?DataConstructorInput<Map<Key, Value>, DataType>} [data] 
   * @returns {DataMap<Key, Value, DataType>} 
   */
  public static fromObject<
    Key extends PropertyKey,
    Value,
    DataType extends DataCore<Map<Key, Value>> = Data<Map<Key, Value>>
  >(
    obj: Record<Key, Value>,
    data?: DataConstructorInput<Map<Key, Value>, DataType>
  ): DataMap<Key, Value, DataType> {
    return new DataMap(Object.entries(obj) as [Key, Value][], data);
  }

  /**
   * @description Returns the `string` tag representation of the `DataMap` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   */
  public override get [Symbol.toStringTag](): string {
    return DataMap.name;
  }

  /**
   * Creates an instance of `DataMap`.
   * @constructor
   * @param {?[Key, Value][]} [entries] Initial value for `Map`.
   * @param {?DataConstructorInput<Map<Key, Value>, DataType>} [data] The data store of `DataType` for `Map` value, also with params.
   */
  constructor(
    entries?: [Key, Value][],
    data?: DataConstructorInput<Map<Key, Value>, DataType>
  ) {
    super(entries, Map, data);
  }
}
