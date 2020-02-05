import mustBe from '@agte/type/mustBe';

/**
 * @typedef {object} ItemData
 * @property {!string} id
 */
/* exported ItemData */

export default class Item {
  /**
   * @type {string}
   * @private
   */
  #id;

  /**
   * @member {string} id
   * @readonly
   */

  get id() {
    return this.#id;
  }

  /**
   * @param {ItemData} data
   */
  constructor({ id }) {
    mustBe.nonEmptyString(id);
    this.#id = id;
  }

  /**
   * @returns {ItemData}
   */
  toJSON() {
    return { id: this.id };
  }
}
