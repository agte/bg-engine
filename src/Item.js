import type from '@agte/type';

export default class Item {
  constructor({ id }) {
    type.nonEmptyString(id);
    Object.defineProperty(this, 'id', { value: id });
  }

  toJSON() {
    return { id: this.id };
  }
}
