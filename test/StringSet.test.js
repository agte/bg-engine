import { serial as test } from 'ava';
import StringSet from '../src/StringSet.js';

test('class', (t) => {
  t.true(Object.prototype.isPrototypeOf.call(Set, StringSet));
});

test('constructor: no data', (t) => {
  const set = new StringSet();
  t.is(set.size, 0);
});

test('constructor: wrong data', (t) => {
  t.throws(() => new StringSet(null));
  t.throws(() => new StringSet({ 0: 'abc', 1: 'def' }));
});

test('constructor: empty data', (t) => {
  const set = new StringSet([]);
  t.is(set.size, 0);
});

test('constructor: non empty data', (t) => {
  const set = new StringSet(['abc', 'def']);
  t.is(set.size, 2);
  t.true(set.has('abc'));
  t.deepEqual(Array.from(set), ['abc', 'def']);
});

test('method "has": wrong arguments', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  t.throws(() => set.has(5));
  t.throws(() => set.has(''));
});

test('method "has": right arguments', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  t.false(set.has('f'));
  t.true(set.has('b'));
});

test('method "add": wrong arguments', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  t.throws(() => set.add(5));
  t.throws(() => set.add(''));
});

test('method "add": right arguments', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  set.add('a');
  set.add('d');
  t.is(set.size, 4);
  t.deepEqual(Array.from(set), ['a', 'b', 'c', 'd']);
});

test('method "add": right order', (t) => {
  const set = new StringSet(['x', 'a', 'b']);
  set.add('a');
  set.add('q');
  t.deepEqual(Array.from(set), ['x', 'a', 'b', 'q']);
});

test('method "delete": wrong arguments', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  t.throws(() => set.delete(5));
  t.throws(() => set.delete(''));
});

test('method "delete": right arguments', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  set.delete('f');
  set.delete('a');
  t.is(set.size, 2);
  t.deepEqual(Array.from(set), ['b', 'c']);
});
