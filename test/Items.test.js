/* eslint-disable max-classes-per-file */
import assert from 'assert';
import Items from '../lib/Items.js';
import Item from '../lib/Item.js';

export default Promise.resolve().then(async () => {
  class SuperItem extends Item {}
  let items;

  assert.ok(Object.prototype.isPrototypeOf.call(Map, Items));

  // constructor
  assert.doesNotThrow(() => new Items());
  assert.throws(() => new Items({}));
  assert.throws(() => new Items(null));
  assert.throws(() => new Items(5));
  assert.throws(() => new Items([{}]));
  assert.throws(() => new Items([], 5));
  assert.throws(() => new Items([], null));
  /* eslint-disable prefer-arrow-callback, func-names */
  assert.throws(() => new Items([], function () {}));
  /* eslint-enable prefer-arrow-callback, func-names */
  assert.throws(() => new Items([], () => {}));
  assert.throws(() => new Items([], Map));

  assert.doesNotThrow(() => new Items([]));
  assert.doesNotThrow(() => new Items([{ id: 'abc' }]));
  assert.doesNotThrow(() => new Items([{ id: 'abc' }, { id: 'cde' }]));
  assert.throws(() => new Items([{ id: 'abc' }, { id: 'bcd' }, { id: 'abc' }]));

  items = new Items([{ id: 'abc' }, { id: 'cde' }]);
  assert.ok(items.get('abc') instanceof Item);

  items = new Items([{ id: 'abc' }, { id: 'cde' }], Item);
  assert.ok(items.get('abc') instanceof Item);

  items = new Items([{ id: 'abc' }, { id: 'cde' }], SuperItem);
  assert.ok(items.get('abc') instanceof SuperItem);

  class AlianItem {}
  assert.throws(() => new Items([{ id: 'abc' }, { id: 'cde' }], AlianItem));

  // .toArray() => Array.<Object>
  items = new Items([{ id: 'abc' }, { id: 'cde' }], SuperItem);
  const array = items.toArray();
  assert.equal(array.length, items.size);
  assert.ok(array[0] instanceof SuperItem);

  // .toJSON() => Array.<Object>
  items = new Items([{ id: 'abc' }, { id: 'cde' }], SuperItem);
  const json = items.toJSON();
  assert.deepEqual(json, [{ id: 'abc' }, { id: 'cde' }]);

  // .first() => Item|null
  items = new Items([]);
  assert.equal(items.first(), null);

  items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  assert.equal(items.first(), items.get('abc'));

  // .last()
  items = new Items([]);
  assert.equal(items.last(), null);

  items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  assert.equal(items.last(), items.get('efg'));

  // .nextAfter(value) => Item|null
  items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  assert.throws(() => items.nextAfter(5));
  assert.throws(() => items.nextAfter(''));

  items = new Items([]);
  assert.equal(items.nextAfter('abc'), null);

  items = new Items([{ id: 'abc' }]);
  assert.equal(items.nextAfter('abc'), items.get('abc'));

  items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  assert.equal(items.nextAfter('abc'), items.get('cde'));
  assert.equal(items.nextAfter('efg'), items.get('abc'));
  assert.equal(items.nextAfter('xyz'), null);
});
