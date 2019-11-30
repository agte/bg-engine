import mustBe from '@agte/type/mustBe';

export default class StringSet extends Set {
  constructor(items = []) {
    mustBe.array(items);
    items.forEach((item) => mustBe.nonEmptyString(item));
    super(items);
  }

  add(item) {
    mustBe.nonEmptyString(item);
    return super.add(item);
  }

  delete(item) {
    mustBe.nonEmptyString(item);
    return super.delete(item);
  }

  has(item) {
    mustBe.nonEmptyString(item);
    return super.has(item);
  }

  toJSON() {
    return Array.from(this);
  }
}
