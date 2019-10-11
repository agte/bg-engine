import { serial as test } from 'ava';
import Game from '../src/Game.js';
import Items from '../src/Items.js';
import State from '../src/State.js';

test('constructor: no data', (t) => {
  t.throws(() => new Game());
});

test('property "players": default value', (t) => {
  t.throws(() => new Game({}));
});

test('property "players": empty initial value', (t) => {
  t.throws(() => new Game({ players: [] }));
});

test('property "players": initial value', (t) => {
  const game = new Game({ players: [{ id: 'abc' }] });
  t.is(typeof game.players, 'object');
  t.true(game.players instanceof Items);
  t.true(game.players.has('abc'));
});

test('property "finished": default value', (t) => {
  const game = new Game({ players: [{ id: 'abc' }] });
  t.false(game.finished);
});

test('property "finished": initial value', (t) => {
  const game = new Game({ players: [{ id: 'abc' }], finished: true });
  t.true(game.finished);
});

test('property "finished": manipulating', (t) => {
  const game = new Game({ players: [{ id: 'abc' }] });
  t.throws(() => { game.finished = null; });
  t.throws(() => { game.finished = undefined; });
  t.throws(() => { game.finished = 1; });
  t.notThrows(() => { game.finished = true; });
  t.true(game.finished);
});

test('method "toJSON"', (t) => {
  const game = new Game({ players: [{ id: 'abc', actions: ['go'] }], finished: true });
  const json = game.toJSON();
  t.deepEqual(json, {
    players: [
      {
        id: 'abc',
        actions: ['go'],
        score: 0,
      },
    ],
    finished: true,
  });
});

test('method "move": wrong arguments', (t) => {
  const game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  game.go = function go() {};
  t.throws(() => game.move());
  t.throws(() => game.move(2));
  t.throws(() => game.move('abc'));
  t.throws(() => game.move('abc', 3));
  t.throws(() => game.move('abc', 'go', null));
});

test('method "move": parameter "player"', (t) => {
  t.plan(4);
  const game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  game.go = function go() {
    t.pass();
  };
  t.notThrows(() => game.move('abc', 'go'));
  t.notThrows(() => game.move('abc', 'go', { a: 5, b: 7 }));
});

test('method "move": called action', (t) => {
  t.plan(3);
  const game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  game.go = function go(player, options, diff) {
    t.is(player, game.players.get('abc'));
    t.deepEqual(options, { a: 5, b: 7 });
    t.true(diff instanceof State);
  };
  game.move('abc', 'go', { a: 5, b: 7 });
});

test('method "move": return', (t) => {
  const game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  game.go = function go(player, options, diff) {
    diff.set('cde', 5);
  };
  const diff = game.move('abc', 'go', { a: 5, b: 7 });
  t.true(diff instanceof State);
  t.deepEqual(diff.view(), { cde: 5 });
});
