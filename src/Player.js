import type from '@agte/type';
import StringSet from './StringSet.js';
import Item from './Item.js';

export default class Player extends Item {
  #score;

  get score() {
    return this.#score;
  }

  set score(value) {
    type.number(value);
    this.#score = value;
  }

  constructor({ actions = [], score = 0, ...other } = {}) {
    super(other);
    Object.defineProperty(this, 'actions', { value: new StringSet(actions) });
    this.score = score;
  }

  toJSON() {
    const json = super.toJSON();
    return {
      ...json,
      score: this.score,
      actions: this.actions.toJSON(),
    };
  }
}
