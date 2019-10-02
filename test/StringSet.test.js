import { serial as test } from 'ava';
import StringSet from '../src/StringSet.js';

test('class', (t) => {
  t.is(typeof StringSet, 'function');
  t.true(Object.prototype.isPrototypeOf.call(Set, StringSet));
});

test('constructor: without data', (t) => {
  t.notThrows(() => new StringSet());
  t.notThrows(() => new StringSet([]));
  const set = new StringSet();
  t.is(set.size, 0);
});

test('constructor: with data', (t) => {
  t.throws(() => new StringSet(null));
  t.throws(() => new StringSet({ 0: 'abc', 1: 'def' }));
  let set;
  t.notThrows(() => { set = new StringSet(['abc', 'def']); });
  t.is(set.size, 2);
  t.true(set.has('abc'));
  t.deepEqual(Array.from(set), ['abc', 'def']);
});

test('method "has"', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  t.throws(() => set.has(5));
  t.throws(() => set.has(''));
  t.false(set.has('f'));
  t.true(set.has('b'));
});

test('method "add"', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  t.throws(() => set.add(5));
  t.throws(() => set.add(''));
  t.notThrows(() => set.add('a'));
  t.notThrows(() => set.add('d'));
  t.is(set.size, 4);
  t.deepEqual(Array.from(set), ['a', 'b', 'c', 'd']);
});

test('method "delete"', (t) => {
  const set = new StringSet(['a', 'b', 'c']);
  t.throws(() => set.delete(5));
  t.throws(() => set.delete(''));
  t.notThrows(() => set.delete('f'));
  t.notThrows(() => set.delete('a'));
  t.is(set.size, 2);
  t.deepEqual(Array.from(set), ['b', 'c']);
});
