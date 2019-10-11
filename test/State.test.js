import { serial as test } from 'ava';
import State from '../src/State.js';

test('constructor: no args', (t) => {
  const state = new State();
  t.is(state.size, 0);
});

test('constructor: redundant args', (t) => {
  t.throws(() => new State([['abc', 567]]));
});

test('method "set": no args', (t) => {
  const state = new State();
  t.throws(() => state.set());
});

test('method "set": wrong args', (t) => {
  const state = new State();
  t.throws(() => state.set(5, 456));
});

test('method "set": good args', (t) => {
  const state = new State();
  state.set('abc', 456);
  t.is(state.get('abc'), 456);
});

test('method "has": no args', (t) => {
  const state = new State();
  state.set('abc', 456);
  t.throws(() => state.has());
});

test('method "has": wrong args', (t) => {
  const state = new State();
  state.set('567', 456);
  t.throws(() => state.has(567));
});

test('method "has": good args', (t) => {
  const state = new State();
  state.set('abc', 456);
  t.true(state.has('abc'));
  t.false(state.has('cde'));
});

test('method "get": no args', (t) => {
  const state = new State();
  state.set('abc', 456);
  t.throws(() => state.get());
});

test('method "get": wrong args', (t) => {
  const state = new State();
  state.set('567', 456);
  t.throws(() => state.get(567));
});

test('method "get": good args', (t) => {
  const state = new State();
  state.set('abc', 456);
  const value = state.get('abc');
  t.is(value, 456);
});

test('method "push": no args', (t) => {
  const state = new State();
  t.throws(() => state.push());
});

test('method "push": wrong args', (t) => {
  const state = new State();
  t.throws(() => state.push(5, 456));
});

test('method "push": good args', (t) => {
  const state = new State();
  state.push('abc', 456);
  state.push('abc', 678);
  t.deepEqual(state.get('abc'), [456, 678]);
});

test('method "view": no args', (t) => {
  const state = new State();
  state.set('score', 21);
  state.push('cards', 'K');
  state.push('cards', 'Q');
  t.throws(() => state.view());
});

test('method "view": wrong args', (t) => {
  const state = new State();
  state.set('score', 21);
  state.push('cards', 'K');
  state.push('cards', 'Q');
  t.throws(() => state.view(1));
});

test('method "view": good args', (t) => {
  const state = new State();
  state.set('score', 21);
  state.push('cards', 'K');
  state.push('cards', 'Q');
  const view = state.view('player1');
  t.deepEqual(view, { score: 21, cards: ['K', 'Q'] });
});

test('method "toJSON"', (t) => {
  const state = new State();
  state.set('score', 21);
  state.push('cards', 'K');
  state.push('cards', 'Q');
  const json = state.toJSON();
  t.deepEqual(json, { score: 21, cards: ['K', 'Q'] });
});
