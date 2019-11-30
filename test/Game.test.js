import assert from 'assert';
import Game from '../lib/Game.js';
import Items from '../lib/Items.js';
import State from '../lib/State.js';

export default Promise.resolve().then(async () => {
  let game;
  let counter;

  // constructor
  assert.throws(() => new Game());
  assert.throws(() => new Game({}));
  assert.throws(() => new Game({ players: [] }));

  game = new Game({ players: [{ id: 'abc' }] });

  // .players
  assert.equal(typeof game.players, 'object');
  assert.ok(game.players instanceof Items);
  assert.equal(game.players.has('abc'), true);

  // .finished
  game = new Game({ players: [{ id: 'abc' }], finished: true });
  assert.equal(game.finished, true);

  game = new Game({ players: [{ id: 'abc' }] });
  assert.equal(game.finished, false);
  assert.throws(() => { game.finished = null; });
  assert.throws(() => { game.finished = undefined; });
  assert.throws(() => { game.finished = 1; });
  game.finished = true;
  assert.equal(game.finished, true);

  // .toJSON
  game = new Game({ players: [{ id: 'abc', actions: ['go'] }], finished: true });
  assert.deepEqual(game.toJSON(), {
    players: [
      {
        id: 'abc',
        actions: ['go'],
        score: 0,
      },
    ],
    finished: true,
  });

  // .move()
  game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  game.go = function go() {};
  assert.throws(() => game.move());
  assert.throws(() => game.move(2));
  assert.throws(() => game.move('abc'));
  assert.throws(() => game.move('abc', 3));
  assert.throws(() => game.move('abc', 'go', null));

  game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  counter = 2;
  game.go = function go() {
    assert.ok(counter);
    counter -= 1;
  };
  assert.doesNotThrow(() => game.move('abc', 'go'));
  assert.doesNotThrow(() => game.move('abc', 'go', { a: 5, b: 7 }));

  // Diff
  game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  counter = 1;
  game.go = function go(player, options, diff) {
    assert.ok(counter);
    counter -= 1;
    diff.set('cde', 5);
    assert.deepEqual(player, game.players.get('abc'));
    assert.deepEqual(options, { a: 5, b: 7 });
    assert.ok(diff instanceof State);
  };
  const diff = game.move('abc', 'go', { a: 5, b: 7 });
  assert.ok(diff instanceof State);
  assert.deepEqual(diff.view(), { cde: 5 });

  // unknown move
  game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  assert.throws(() => game.move('abc', 'go', { a: 5, b: 7 }));

  // move after finish
  game = new Game({ players: [{ id: 'abc', actions: ['go'] }], finished: true });
  counter = 0;
  game.go = function go(player, options, diff) {
    assert.ok(counter);
  };
  assert.throws(() => game.move('abc', 'go', { a: 5, b: 7 }));

  // move by wrong player
  game = new Game({ players: [{ id: 'abc', actions: ['go'] }] });
  counter = 0;
  game.go = function go(player, options, diff) {
    assert.ok(counter);
  };
  assert.throws(() => game.move('bcd', 'go', { a: 5, b: 7 }));

  // disallowed action
  game = new Game({ players: [{ id: 'abc' }] });
  counter = 0;
  game.go = function go(player, options, diff) {
    assert.ok(counter);
  };
  assert.throws(() => game.move('abc', 'go', { a: 5, b: 7 }));
});
