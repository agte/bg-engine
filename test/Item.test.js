import assert from 'assert';
import Item from '../lib/Item.js';

export default Promise.resolve().then(async () => {
  let item;

  // constructor
  assert.throws(() => new Item());
  assert.throws(() => new Item([]));
  assert.throws(() => new Item(null));
  assert.throws(() => new Item(5));
  assert.throws(() => new Item({}));
  assert.throws(() => new Item({ id: 5 }));
  assert.throws(() => new Item({ id: { length: 3 } }));
  assert.throws(() => new Item({ id: new String('abc') })); // eslint-disable-line no-new-wrappers
  assert.throws(() => new Item({ id: '' }));

  item = new Item({ id: 'abc' });
  assert.equal(item.id, 'abc');
  assert.throws(() => { item.id = 'xyz'; });
  assert.equal(item.id, 'abc');

  // .toJSON() => Object
  const json = item.toJSON();
  assert.deepEqual(json, { id: 'abc' });
  item = new Item(json);
  assert.equal(item.id, 'abc');
});
