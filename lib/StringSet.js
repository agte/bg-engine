import mustBe from '@agte/type/mustBe';

/**
 * @augments Set
 */
export default class StringSet extends Set {
  /**
   * @param {Array.<string>=} [items=[]] Array of non empty strings
   */
  constructor(items = []) {
    mustBe.array(items);
    items.forEach((item) => mustBe.nonEmptyString(item));
    super(items);
  }

  /**
   * @param {string} item A non empty string
   * @returns {StringSet} chainable
   */
  add(item) {
    mustBe.nonEmptyString(item);
    return super.add(item);
  }

  /**
   * @param {string} item A non empty string
   * @returns {StringSet} chainable
   */
  delete(item) {
    mustBe.nonEmptyString(item);
    return super.delete(item);
  }

  /**
   * @param {string} item A non empty string
   * @returns {boolean} TRUE if the set includes this item
   */
  has(item) {
    mustBe.nonEmptyString(item);
    return super.has(item);
  }

  /**
   * @returns {Array.<string>} JSON representation
   */
  toJSON() {
    return Array.from(this);
  }
}
