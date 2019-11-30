import assert from 'assert';
import Player from '../lib/Player.js';
import Item from '../lib/Item.js';
import StringSet from '../lib/StringSet.js';

export default Promise.resolve().then(async () => {
  let player;

  assert.ok(Object.prototype.isPrototypeOf.call(Item, Player));

  // constructor
  assert.throws(() => new Player());
  player = new Player({ id: 'abc' });
  assert.equal(typeof player.actions, 'object');
  assert.ok(player.actions instanceof StringSet);
  assert.equal(player.actions.size, 0);

  player = new Player({ id: 'abc', actions: ['go', 'stay'] });
  assert.equal(typeof player.actions, 'object');
  assert.ok(player.actions instanceof StringSet);
  assert.deepEqual(Array.from(player.actions), ['go', 'stay']);
  assert.throws(() => { player.actions = null; });
  assert.equal(player.score, 0);

  assert.throws(() => new Player({ id: 'abc', score: '5' }));
  assert.throws(() => new Player({ id: 'abc', score: NaN }));
  player = new Player({ id: 'abc', score: 0.5 });
  assert.equal(player.score, 0.5);

  // .toJSON() => Object
  player = new Player({ id: 'abc' });
  player.actions.add('go');
  player.score = 5;
  assert.deepEqual(player.toJSON(), {
    id: 'abc',
    actions: ['go'],
    score: 5,
  });
  player = new Player(player.toJSON());
  assert.equal(player.id, 'abc');
  assert.ok(player.actions.has('go'));
  assert.equal(player.score, 5);
});
