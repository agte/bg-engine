import test from 'ava';
import Player from '../src/Player.js';

test('create new', (t) => {
  const player = new Player({ id: 'abc' });
  t.is(player.id, 'abc');
  t.is(typeof player.actions, 'object');
  t.truthy(player.actions instanceof Set);
  t.is(player.actions.size, 0);
  t.is(player.score, 0);
  t.throws(() => new Player());
});

test('change', (t) => {
  const player = new Player({ id: 'abc' });
  t.throws(() => { player.id = 5; });
  t.throws(() => { player.actions = []; });
  t.throws(() => { player.score = false; });
  t.notThrows(() => { player.score = 5; });
  t.is(player.score, 5);
});

test('serialize', (t) => {
  const player = new Player({ id: 'abc' });
  player.actions.add('go');
  player.score = 5;
  const json = player.toJSON();
  t.deepEqual(json, {
    id: 'abc',
    actions: ['go'],
    score: 5,
  });
});

test('restore', (t) => {
  const player = new Player({ id: 'abc' });
  player.actions.add('go');
  player.score = 5;
  const json = player.toJSON();

  const restoredPlayer = new Player(json);
  t.is(restoredPlayer.id, 'abc');
  t.truthy(restoredPlayer.actions.has('go'));
  t.is(restoredPlayer.score, 5);
});