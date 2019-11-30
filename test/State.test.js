import assert from 'assert';
import State from '../lib/State.js';

export default Promise.resolve().then(async () => {
  let state;

  // constructor
  assert.throws(() => new State([['abc', 567]]));
  state = new State();
  assert.equal(state.size, 0);

  // .set(key, value)
  assert.throws(() => state.set());
  assert.throws(() => state.set(5, 456));
  state.set('abc', 456);

  // .get(key)
  assert.throws(() => state.get());
  assert.throws(() => state.get(567));
  assert.equal(state.get('abc'), 456);

  // .has(key)
  assert.throws(() => state.has());
  assert.throws(() => state.has(567));
  assert.equal(state.has('abc'), true);
  assert.equal(state.has('cde'), false);

  // .push(key, value)
  assert.throws(() => state.push());
  assert.throws(() => state.push(5, 456));
  state.push('abc', 456);
  state.push('abc', 678);
  assert.deepEqual(state.get('abc'), [456, 678]);

  // .view() => Object
  state = new State();
  state.set('score', 21);
  state.set('profile', {
    name: 'Mike',
    toJSON: function toJSON() {
      return { name: this.name };
    },
  });
  state.set('awards', {
    price1: 'A',
    price2: 'B',
    toArray: function toArray() {
      return [this.price1, this.price2];
    },
    toJSON: function toJSON() {
      return {
        price1: 'A',
        price2: 'B',
      };
    },
  });
  state.push('cards', {
    name: 'King',
    view: function view(player) {
      return player === '1' ? { name: this.name } : {};
    },
    toJSON: function toJSON() {
      return { name: this.name };
    },
  });
  state.push('cards', {
    name: 'Queen',
    view: function view(player) {
      return player === '1' ? { name: this.name } : {};
    },
    toJSON: function toJSON() {
      return { name: this.name };
    },
  });

  assert.throws(() => state.view(1));
  assert.deepEqual(state.view('1'), {
    score: 21,
    cards: [{ name: 'King' }, { name: 'Queen' }],
    profile: { name: 'Mike' },
    awards: ['A', 'B'],
  });
  assert.deepEqual(state.view(), {
    score: 21,
    cards: [{}, {}],
    profile: { name: 'Mike' },
    awards: ['A', 'B'],
  });

  // .toJSON() => Object
  assert.deepEqual(state.toJSON(), {
    score: 21,
    cards: [{ name: 'King' }, { name: 'Queen' }],
    profile: { name: 'Mike' },
    awards: { price1: 'A', price2: 'B' },
  });
});
