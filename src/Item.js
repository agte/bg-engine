import { assert } from '@agte/type';

export default class Item {
  constructor({ id }) {
    assert.nonEmptyString(id);
    Object.defineProperty(this, 'id', { value: id });
  }

  toJSON() {
    return { id: this.id };
  }
}
