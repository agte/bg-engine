import type from '@agte/type';
import Item from './Item.js';

export default class Items extends Map {
  constructor(items = [], ItemClass = Item) {
    type.array(items);
    items.forEach((item) => { type.object(item); type.nonEmptyString(item.id); });
    type.class(ItemClass);
    if (ItemClass !== Item && !Object.prototype.isPrototypeOf.call(Item, ItemClass)) {
      throw new TypeError('ItemClass must extend class "Item" or must be assigned to it');
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

  toArray() {
    return Array.from(this.values());
  }

  toJSON() {
    return this.toArray().map((player) => player.toJSON());
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
    type.nonEmptyString(id);
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

  getView(playerId = '') {
    type.string(playerId);
    return this.toArray().map((item) => item.getView(playerId));
  }
}
