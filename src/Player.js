import type from '@agte/type';

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
    type.string(id);
    type.strings(actions);

    Object.defineProperty(this, 'id', { value: String(id) });
    Object.defineProperty(this, 'actions', { value: new Set(actions) });
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
