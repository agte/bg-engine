import { serial as test } from 'ava';
import Players from '../src/Players.js';

test('class', (t) => {
  t.is(typeof Players, 'function');
  t.true(Object.prototype.isPrototypeOf.call(Map, Players));
});

test('constructor: without data', (t) => {
  t.throws(() => new Players());
});

test('constructor: with data', (t) => {
  t.throws(() => new Players(4));
  t.throws(() => new Players({}));
  t.throws(() => new Players([]));
  t.throws(() => new Players([5]));
  t.throws(() => new Players([{}]));
  t.throws(() => new Players([{ id: 2 }]));
  let players;
  t.notThrows(() => { players = new Players([{ id: 'abc' }, { id: 'def' }]); });
  t.is(players.size, 2);
  t.true(players.has('def'));
  t.false(players.has('xyz'));
  t.is(players.get('def').id, 'def');
});

test('constructor: duplicated data', (t) => {
  t.throws(() => new Players([{ id: 'abc' }, { id: 'def' }, { id: 'abc' }]));
});

test('set: disabled', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }]);
  t.throws(() => players.set('xyz', { id: 'xyz' }));
});

test('delete: disabled', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }]);
  t.throws(() => players.delete('xyz'));
});

test('clear: disabled', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }]);
  t.throws(() => players.clear());
});

test('nextAfter', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }, { id: 'xyz' }]);
  t.throws(() => players.nextAfter(5));
  t.throws(() => players.nextAfter(null));
  t.throws(() => players.nextAfter(''));
  t.falsy(players.nextAfter('lmn'));
  t.is(players.nextAfter('abc').id, 'def');
  t.is(players.nextAfter('xyz').id, 'abc');
});