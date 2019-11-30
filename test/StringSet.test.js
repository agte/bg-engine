import assert from 'assert';
import StringSet from '../lib/StringSet.js';

export default Promise.resolve().then(async () => {
  // inheritance
  assert(Object.prototype.isPrototypeOf.call(Set, StringSet));

  // constructor(Array)
  assert.equal((new StringSet()).size, 0);
  assert.equal((new StringSet([])).size, 0);
  assert.throws(() => new StringSet(null));
  assert.throws(() => new StringSet({ 0: 'abc', 1: 'def' }));
  const set = new StringSet(['a', 'b', 'c']);
  assert.equal(set.size, 3);
  assert.deepEqual(Array.from(set), ['a', 'b', 'c']);

  // .has(value) => Boolean
  assert.throws(() => set.has(5));
  assert.throws(() => set.has(''));
  assert.equal(set.has('f'), false);
  assert.equal(set.has('b'), true);

  // .add(value)
  assert.throws(() => set.add(5));
  assert.throws(() => set.add(''));
  set.add('a');
  assert.equal(set.size, 3);
  set.add('d');
  assert.equal(set.size, 4);
  assert.deepEqual(Array.from(set), ['a', 'b', 'c', 'd']);

  // .delete(value)
  assert.throws(() => set.delete(5));
  assert.throws(() => set.delete(''));
  set.delete('f');
  assert.equal(set.size, 4);
  set.delete('a');
  assert.equal(set.size, 3);

  // .toJSON() => Array
  assert.deepEqual(set.toJSON(), ['b', 'c', 'd']);
});
