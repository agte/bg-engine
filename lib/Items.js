import mustBe from '@agte/type/mustBe';
import Item from './Item.js';

/* global ItemData */

/**
 * @augments Map
 */
export default class Items extends Map {
  /**
   * @param {Array.<ItemData>=} [items=[]]
   * @param {Function} [ItemClass=Item] A class extending Item class
   */
  constructor(items = [], ItemClass = Item) {
    mustBe.array(items);
    items.forEach((item) => {
      mustBe.object(item);
      mustBe.nonEmptyString(item.id);
    });
    mustBe.class(ItemClass);
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

  /**
   * @returns {Array.<ItemData>}
   */
  toJSON() {
    return this.toArray().map((item) => item.toJSON());
  }

  /**
   * @returns {Array.<Item>}
   */
  toArray() {
    return Array.from(this.values());
  }

  /**
   * @returns {?Item}
   */
  first() {
    if (this.size === 0) {
      return null;
    }
    return Array.from(this.values())[0];
  }

  /**
   * @returns {?Item}
   */
  last() {
    if (this.size === 0) {
      return null;
    }
    return Array.from(this.values())[this.size - 1];
  }

  /**
   * @param {string} id
   * @returns {?Item}
   */
  nextAfter(id) {
    mustBe.nonEmptyString(id);
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
