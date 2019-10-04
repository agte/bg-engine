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
  t.throws(() => new Item({ id: new String('abc') }));
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

test('property "whiteList": default value', (t) => {
  const item = new Item({ id: 'abc' });
  t.is(typeof item.whiteList, 'object');
  t.true(item.whiteList instanceof StringSet);
  t.is(item.whiteList.size, 0);
});

test('property "whiteList": initial value', (t) => {
  const item = new Item({ id: 'abc', whiteList: ['*', 'Player1'] });
  t.is(item.whiteList.size, 2);
  t.true(item.whiteList.has('*'));
  t.true(item.whiteList.has('Player1'));
});

test('property "whiteList": readonly', (t) => {
  const item = new Item({ id: 'abc' });
  t.throws(() => { item.whiteList = new StringSet() });
});

test('method "toJSON"', (t) => {
  const item = new Item({ id: 'abc' });
  const json = item.toJSON();
  t.deepEqual(json, { id: 'abc', whiteList: [] });
});

test('method "getView": wrong arguments', (t) => {
  const item = new Item({ id: 'abc' });
  t.throws(() => item.getView(5));
  t.throws(() => item.getView(''));
});

test('method "getView": no arguments', (t) => {
  const item = new Item({ id: 'abc', whiteList: [] });
  t.deepEqual(item.getView(), { id: 'abc', visible: false });
  item.whiteList.add('Player1');
  t.deepEqual(item.getView(), { id: 'abc', visible: false });
  item.whiteList.add('*');
  t.deepEqual(item.getView(), { id: 'abc', visible: true });
});

test('method "getView": right arguments', (t) => {
  const item = new Item({ id: 'abc', whiteList: [] });
  t.deepEqual(item.getView('Player1'), { id: 'abc', visible: false });
  item.whiteList.add('Player1');
  t.deepEqual(item.getView('Player1'), { id: 'abc', visible: true });
  item.whiteList.delete('Player1');
  item.whiteList.add('*');
  t.deepEqual(item.getView('Player1'), { id: 'abc', visible: true });
});