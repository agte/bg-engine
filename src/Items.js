import { assert } from '@agte/type';
import Item from './Item.js';

export default class Items extends Map {
  constructor(items = [], ItemClass = Item) {
    assert.array(items);
    items.forEach((item) => {
      assert.object(item);
      assert.nonEmptyString(item.id);
    });
    assert.class(ItemClass);
    if (ItemClass !== Item && !Object.prototype.isPrototypeOf.call(Item, ItemClass)) {
      throw new TypeError('Argument "ItemClass" must extend class "Item" or must be assigned to it');
    }

    super();
    items.forEach((item) => {
      const { id } = item;
      if (this.has(id)) {
        throw new Error('Duplicated id');
      }
      super.set(id, new ItemClass({ ...item, id }));
    });
  }

  toJSON() {
    return this.toArray().map((item) => item.toJSON());
  }

  toArray() {
    return Array.from(this.values());
  }

  first() {
    if (this.size === 0) {
      return null;
    }
    return Array.from(this.values())[0];
  }

  last() {
    if (this.size === 0) {
      return null;
    }
    return Array.from(this.values())[this.size - 1];
  }

  nextAfter(id) {
    assert.nonEmptyString(id);
    if (this.size === 0) {
      return null;
    }
    if (!this.has(id)) {
      return null;
    }

    const keys = Array.from(this.keys());
    const index = keys.indexOf(id);
    const nextIndex = index === this.size - 1 ? 0 : index + 1;
    const nextId = keys[nextIndex];
    return this.get(nextId);
  }
}
