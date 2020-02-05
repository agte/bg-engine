import mustBe from '@agte/type/mustBe';

/**
 * @param {*} value
 * @param {string} playerId
 * @returns {*}
 */
const getView = (value, playerId) => {
  if (value !== null && typeof value === 'object') {
    if (value.view && typeof value.view === 'function') {
      return value.view(playerId);
    }
    if (Array.isArray(value)) {
      return value.map((v) => getView(v, playerId));
    }
    if (value.toArray && typeof value.toArray === 'function') {
      return value.toArray().map((v) => getView(v, playerId));
    }
    if (value.toJSON && typeof value.toJSON === 'function') {
      return value.toJSON();
    }
  }
  return value;
};

/**
 * @param {*} value
 * @returns {*}
 */
const toJSON = (value) => {
  if (value !== null && typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map((v) => toJSON(v));
    }
    if (value.toJSON && typeof toJSON === 'function') {
      return value.toJSON();
    }
  }
  return value;
};

/**
 * @augments Map
 */
export default class State extends Map {
  constructor(...args) {
    if (args.length > 0) {
      throw new Error('Constructor must be called with no arguments');
    }
    super();
  }

  /**
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    mustBe.nonEmptyString(key);
    return super.has(key);
  }

  /**
   * @description Retrieves a value at "key" position
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    mustBe.nonEmptyString(key);
    return super.get(key);
  }

  /**
   * @description Puts a value at "key" position
   * @param {string} key
   * @param {*} value
   * @returns {State} this
   */
  set(key, value) {
    mustBe.nonEmptyString(key);
    return super.set(key, value);
  }

  /**
   * @description Pushes a value into an array located at "key" position
   * @param {string} key
   * @param {*} value
   */
  push(key, value) {
    mustBe.nonEmptyString(key);
    if (!Array.isArray(this.get(key))) {
      this.set(key, []);
    }
    this.get(key).push(value);
  }

  /**
   * @description Returns a cut JSON object. This should protect some private players data.
   * @param {string} playerId
   * @returns {object}
   */
  view(playerId = '') {
    mustBe.string(playerId);
    const entries = Array
      .from(this.entries())
      .map(([key, value]) => [key, getView(value, playerId)]);
    return Object.fromEntries(entries);
  }

  /**
   * @returns {object}
   */
  toJSON() {
    const entries = Array
      .from(this.entries())
      .map(([key, value]) => [key, toJSON(value)]);
    return Object.fromEntries(entries);
  }
}
