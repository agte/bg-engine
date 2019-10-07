import type from '@agte/type';
import StringSet from './StringSet.js';
import Item from './Item.js';

export default class Player extends Item {
  #score;

  constructor({ actions = [], score = 0, ...others } = {}) {
    super(others);
    Object.defineProperty(this, 'actions', { value: new StringSet(actions) });
    this.score = score;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      score: this.score,
      actions: this.actions.toJSON(),
    };
  }

  get score() {
    return this.#score;
  }

  set score(value) {
    type.number(value);
    this.#score = value;
  }
}
