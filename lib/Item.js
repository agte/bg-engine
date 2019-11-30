import mustBe from '@agte/type/mustBe';

export default class Item {
  constructor({ id }) {
    mustBe.nonEmptyString(id);
    Object.defineProperty(this, 'id', { value: id });
  }

  toJSON() {
    return { id: this.id };
  }
}
