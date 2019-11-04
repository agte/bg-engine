import { assert } from '@agte/type';

export default class StringSet extends Set {
  constructor(items = []) {
    assert.array(items);
    items.forEach((item) => assert.nonEmptyString(item));
    super(items);
  }

  add(item) {
    assert.nonEmptyString(item);
    return super.add(item);
  }

  delete(item) {
    assert.nonEmptyString(item);
    return super.delete(item);
  }

  has(item) {
    assert.nonEmptyString(item);
    return super.has(item);
  }

  toJSON() {
    return Array.from(this);
  }
}
