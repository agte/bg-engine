import { serial as test } from 'ava';
import Player from '../src/Player.js';
import Item from '../src/Item.js';
import StringSet from '../src/StringSet.js';

test('class', (t) => {
  t.true(Object.prototype.isPrototypeOf.call(Item, Player));
});

test('constructor: without data', (t) => {
  t.throws(() => new Player());
});

test('property "actions": default value', (t) => {
  const player = new Player({ id: 'abc' });
  t.is(typeof player.actions, 'object');
  t.true(player.actions instanceof StringSet);
  t.is(player.actions.size, 0);
});

test('property "actions": initial value', (t) => {
  let player;
  t.notThrows(() => { player = new Player({ id: 'abc', actions: ['go', 'stay'] }); });
  t.is(typeof player.actions, 'object');
  t.true(player.actions instanceof StringSet);
  t.deepEqual(Array.from(player.actions), ['go', 'stay']);
});

test('property "actions": readonly', (t) => {
  const player = new Player({ id: 'abc', actions: ['go', 'stay'] });
  t.throws(() => { player.actions = null; });
});

test('property "score": default value', (t) => {
  const player = new Player({ id: 'abc' });
  t.is(player.score, 0);
});

test('property "score": initial value', (t) => {
  t.throws(() => new Player({ id: 'abc', score: '5' }));
  t.throws(() => new Player({ id: 'abc', score: NaN }));
  let player;
  t.notThrows(() => { player = new Player({ id: 'abc', score: 0.5 }); });
  t.is(player.score, 0.5);
});

test('property "whiteList": default value', (t) => {
  const player = new Player({ id: 'abc' });
  t.deepEqual(Array.from(player.whiteList), ['*']);
});

test('method "toJSON"', (t) => {
  const player = new Player({ id: 'abc' });
  player.actions.add('go');
  player.score = 5;
  const json = player.toJSON();
  t.deepEqual(json, {
    id: 'abc',
    whiteList: ['*'],
    actions: ['go'],
    score: 5,
  });
});

test('constructor: from json', (t) => {
  const player = new Player({ id: 'abc' });
  player.actions.add('go');
  player.score = 5;
  const json = player.toJSON();
  const restoredPlayer = new Player(json);
  t.is(restoredPlayer.id, 'abc');
  t.true(restoredPlayer.actions.has('go'));
  t.is(restoredPlayer.score, 5);
});
