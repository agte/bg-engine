/* eslint-disable max-classes-per-file */
import { serial as test } from 'ava';
import Items from '../src/Items.js';
import Item from '../src/Item.js';

class SuperItem extends Item {}

test('class', (t) => {
  t.true(Object.prototype.isPrototypeOf.call(Map, Items));
});

test('constructor: no data', (t) => {
  t.notThrows(() => new Items());
});

test('constructor: wrong data', (t) => {
  t.throws(() => new Items({}));
  t.throws(() => new Items(null));
  t.throws(() => new Items(5));
  t.throws(() => new Items([{}]));
  t.throws(() => new Items([], 5));
  t.throws(() => new Items([], null));
  /* eslint-disable prefer-arrow-callback, func-names */
  t.throws(() => new Items([], function () {}));
  /* eslint-enable prefer-arrow-callback, func-names */
  t.throws(() => new Items([], () => {}));
  t.throws(() => new Items([], Map));
});

test('constructor: valid argument "items"', (t) => {
  t.notThrows(() => new Items([]));
  t.notThrows(() => new Items([{ id: 'abc' }]));
  t.notThrows(() => new Items([{ id: 'abc' }, { id: 'cde' }]));
});

test('constructor: duplicated items', (t) => {
  t.throws(() => new Items([{ id: 'abc' }, { id: 'bcd' }, { id: 'abc' }]));
});

test('constructor: default item class', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }]);
  t.true(items.get('abc') instanceof Item);
});

test('constructor: not inherited item class', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }], Item);
  t.true(items.get('abc') instanceof Item);
});

test('constructor: inherited item class', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }], SuperItem);
  t.true(items.get('abc') instanceof SuperItem);
});

test('constructor: wrong item class', (t) => {
  class AlianItem {}
  t.throws(() => new Items([{ id: 'abc' }, { id: 'cde' }], AlianItem));
});

test('method "toArray"', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }], SuperItem);
  const array = items.toArray();
  t.is(array.length, items.size);
  t.true(array[0] instanceof SuperItem);
});

test('method "toJSON"', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }], SuperItem);
  const json = items.toJSON();
  t.deepEqual(json, [{ id: 'abc' }, { id: 'cde' }]);
});

test('metod "first": empty list', (t) => {
  const items = new Items([]);
  t.is(items.first(), null);
});

test('metod "first": non empty list', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  t.is(items.first(), items.get('abc'));
});

test('metod "last": empty list', (t) => {
  const items = new Items([]);
  t.is(items.last(), null);
});

test('metod "last": non empty list', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  t.is(items.last(), items.get('efg'));
});

test('method "nextAfter": wrong arguments', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  t.throws(() => items.nextAfter(5));
  t.throws(() => items.nextAfter(''));
});

test('method "nextAfter": empty list', (t) => {
  const items = new Items([]);
  t.is(items.nextAfter('abc'), null);
});

test('method "nextAfter": list of single item', (t) => {
  const items = new Items([{ id: 'abc' }]);
  t.is(items.nextAfter('abc'), items.get('abc'));
});

test('method "nextAfter": normal case', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  t.is(items.nextAfter('abc'), items.get('cde'));
});

test('method "nextAfter": end of list', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  t.is(items.nextAfter('efg'), items.get('abc'));
});

test('method "nextAfter": unknown id', (t) => {
  const items = new Items([{ id: 'abc' }, { id: 'cde' }, { id: 'efg' }]);
  t.is(items.nextAfter('xyz'), null);
});
