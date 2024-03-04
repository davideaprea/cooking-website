type Predicate<T> = (value: T, index?: number, obj?: T[]) => boolean;

export class PoweredArray<T> extends Array<T>{

  /**
   * Deletes and returns the value of the first element in the array where predicate is true, and undefined
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, deleteItem
   * immediately deletes that element value. Otherwise, undefined is returned.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
  */
  deleteItem(predicate: Predicate<T>, thisArg?: any): T | undefined {
    const i = this.findIndex(predicate, thisArg);
    if (i >= 0) return this.splice(i, 1)[0];
    return undefined;
  }

  /**
   * Deletes and returns those elements in an array where predicate is true.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, deleteAll
   * immediately deletes that element value.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
  */
  deleteAll(predicate: Predicate<T>, thisArg?: any): T[] {
    let deletedItems = [];
    while (true) {
      const deletedItem = this.deleteItem(predicate, thisArg);
      if (!deletedItem) break;
      deletedItems.push(deletedItem);
    }
    return deletedItems;
  }

  /**
   * Finds and replaces the element in an array where predicate is true.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, replaceItem
   * immediately replaces that element value with the given one. Otherwise, undefined is returned.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
  */
  replaceItem(value: T, predicate: Predicate<T>, thisArg?: any): T | undefined {
    const i = this.findIndex(predicate, thisArg);
    if (i < 0) return undefined;
    return this.splice(i, 1, value)[0];
  }
}
