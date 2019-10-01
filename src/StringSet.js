import type from '@agte/type';

export default class StringSet extends Set {
  constructor(items = []) {
    type.array(items);
    items.forEach((item) => type.nonEmptyString(item));
    super(items);
  }

  add(item) {
    type.nonEmptyString(item);
    return super.add(item);
  }

  delete(item) {
    type.nonEmptyString(item);
    return super.delete(item);
  }

  has(item) {
    type.nonEmptyString(item);
    return super.has(item);
  }
}
