import mustBe from '@agte/type/mustBe';
import StringSet from './StringSet.js';
import Item from './Item.js';

/* global ItemData */
/**
 * @typedef {ItemData} PlayerData
 * @property {Array.<string>} actions
 * @property {number} score
 */
/* exported PlayerData */

/**
 * @augments Item
 */
export default class Player extends Item {
  /**
   * @type {StringSet}
   * @private
   */
  #actions;

  /**
   * @member {StringSet} actions
   * @readonly
   */

  get actions() {
    return this.#actions;
  }

  /**
   * @type {number}
   * @private
   */
  #score;

  /**
   * @member {number} score
   * @public
   */

  get score() {
    return this.#score;
  }

  set score(value) {
    mustBe.number(value);
    this.#score = value;
  }

  /**
   * @param {PlayerData} data
   */
  constructor({ actions = [], score = 0, ...others } = {}) {
    super(others);
    this.#actions = new StringSet(actions);
    this.score = score;
  }

  /**
   * @returns {PlayerData} data
   */
  toJSON() {
    return {
      ...super.toJSON(),
      actions: this.actions.toJSON(),
      score: this.score,
    };
  }
}
