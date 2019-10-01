import type from '@agte/type';
import StringSet from './StringSet.js';

export default class Player {
  #score;

  get score() {
    return this.#score;
  }

  set score(value) {
    type.number(value);
    this.#score = value;
  }

  constructor({ id, actions = [], score = 0 }) {
    type.nonEmptyString(id);
    Object.defineProperty(this, 'id', { value: String(id) });

    Object.defineProperty(this, 'actions', { value: new StringSet(actions) });

    this.score = score;
  }

  toJSON() {
    return {
      id: this.id,
      actions: Array.from(this.actions),
      score: this.score,
    };
  }
}
