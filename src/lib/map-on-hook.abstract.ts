// Abstract.
import { DataCore } from "@typescript-package/data";
/**
 * @description
 * @export
 * @abstract
 * @class OnHook
 * @template Key 
 * @template Value 
 * @template {DataCore<any>} DataType 
 */
export abstract class MapOnHook<
  Key,
  Value,
  DataType extends DataCore<any>
> {
  /**
   * @description Hook called when the data is cleared.
   * @protected
   * @param {DataType} data The data holder.
   */
  protected onClear(data: DataType): void { }

  /**
   * @description Hook called when a value is deleted.
   * @protected
   * @param {DataType} data The data holder.
   */
  protected onDelete(key: Key, data: DataType): void { }

  /**
   * @description Hook called before the `get` being invoked.
   * @protected
   * @param {Key} key The key to get the value.
   * @param {DataType} data The data holder.
   */
  protected onGet(key: Key, data: DataType): void { }

  /**
   * @description Hook called when a value is added.
   * @protected
   * @param {key} key The key under which set the `value`.
   * @param {Type} value The value to set.
   * @param {Type} previousValue The previous value.
   * @param {DataType} data The data holder.
   */
  protected onSet(key: Key, value: Value, previousValue: Value, data: DataType): void { }
}