/* eslint-disable max-classes-per-file */
import { serial as test } from 'ava';
import Players from '../src/Players.js';
import Items from '../src/Items.js';
import Player from '../src/Player.js';

class SuperPlayer extends Player {}

test('class', (t) => {
  t.true(Object.prototype.isPrototypeOf.call(Items, Players));
});

test('constructor: no data', (t) => {
  t.throws(() => new Players());
});

test('constructor: wrong data', (t) => {
  t.throws(() => new Players(4));
  t.throws(() => new Players([5]));
  t.throws(() => new Players([{}]));
  t.throws(() => new Players([{ id: 5 }]));
});

test('constructor: default player class', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }]);
  t.true(players.get('abc') instanceof Player);
});

test('constructor: not inherited player class', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }], Player);
  t.true(players.get('abc') instanceof Player);
});

test('constructor: inherited player class', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }], SuperPlayer);
  t.true(players.get('abc') instanceof SuperPlayer);
});

test('constructor: wrong player class', (t) => {
  class AlienPlayer {}
  t.throws(() => new Players([{ id: 'abc' }, { id: 'def' }], AlienPlayer));
});

test('method "set": disabled', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }]);
  t.throws(() => players.set('xyz', { id: 'xyz' }));
});

test('method "delete": disabled', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }]);
  t.throws(() => players.delete('xyz'));
});

test('method "clear": disabled', (t) => {
  const players = new Players([{ id: 'abc' }, { id: 'def' }]);
  t.throws(() => players.clear());
});

test('method "toJSON"', (t) => {
  const players = new Players([
    { id: 'abc', score: 1 },
    { id: 'def', actions: ['go'], whiteList: ['*'] },
    { id: 'xyz' },
  ]);
  const json = players.toJSON();
  t.deepEqual(json, [
    {
      id: 'abc',
      actions: [],
      score: 1,
      whiteList: [],
    },
    {
      id: 'def',
      actions: ['go'],
      score: 0,
      whiteList: ['*'],
    },
    {
      id: 'xyz',
      actions: [],
      score: 0,
      whiteList: [],
    },
  ]);
});
