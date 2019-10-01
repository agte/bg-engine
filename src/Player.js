import type from '@agte/type';

export default class Player {
  #score;

  #active;

  get score() {
    return this.#score;
  }

  set score(value) {
    type.number(value);
    this.#score = value;
  }

  get active() {
    return this.#active;
  }

  set active(value) {
    type.boolean(value);
    this.#active = value;
  }

  constructor({ id, actions = [], score = 0, active = false }) {
    type.string(id);
    type.strings(actions);

    Object.defineProperty(this, 'id', { value: String(id) });
    Object.defineProperty(this, 'actions', { value: new Set(actions) });
    this.score = score;
    this.active = active;
  }

  toJSON() {
    return {
      id: this.id,
      actions: Array.from(this.actions),
      score: this.score,
      active: this.active,
    };
  }
}
