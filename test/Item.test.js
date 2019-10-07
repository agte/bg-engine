import { serial as test } from 'ava';
import Item from '../src/Item.js';
import StringSet from '../src/StringSet.js';

test('constructor: no data', (t) => {
  t.throws(() => new Item());
});

test('constructor: wrong data', (t) => {
  t.throws(() => new Item([]));
  t.throws(() => new Item(null));
  t.throws(() => new Item(5));
  t.throws(() => new Item({}));
});

test('constructor: from json', (t) => {
  const item = new Item({ id: 'abc' });
  const json = item.toJSON();
  const restoredItem = new Item(json);
  t.is(restoredItem.id, 'abc');
});

test('property "id": wrong initial value', (t) => {
  t.throws(() => new Item({ id: 5 }));
  t.throws(() => new Item({ id: { length: 3 } }));
  t.throws(() => new Item({ id: new String('abc') })); // eslint-disable-line no-new-wrappers
  t.throws(() => new Item({ id: '' }));
});

test('property "id": right initial value', (t) => {
  const item = new Item({ id: 'abc' });
  t.is(item.id, 'abc');
});

test('property "id": readonly', (t) => {
  const item = new Item({ id: 'def' });
  t.throws(() => { item.id = 'xyz'; });
  t.is(item.id, 'def');
});

test('method "toJSON"', (t) => {
  const item = new Item({ id: 'abc' });
  const json = item.toJSON();
  t.deepEqual(json, { id: 'abc' });
});
