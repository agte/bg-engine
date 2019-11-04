import { assert } from '@agte/type';
import Items from './Items.js';

const getView = (value, playerId) => {
  if (value !== null && typeof value === 'object') {
    if (value.view && typeof value.view === 'function') {
      return value.view(playerId);
    }
    if (Array.isArray(value)) {
      return value.map((v) => getView(v, playerId));
    }
    if (value instanceof Items) {
      return value.toArray().map((v) => getView(v, playerId));
    }
    if (value.toJSON && typeof value.toJSON === 'function') {
      return value.toJSON();
    }
  }
  return value;
};

const toJSON = (value) => {
  if (value !== null && typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map((v) => toJSON(v));
    }
    if (value.toJSON && typeof toJSON === 'function') {
      return value.toJSON();
    }
  }
  return value;
};

export default class State extends Map {
  constructor(...args) {
    if (args.length > 0) {
      throw new Error('Constructor must be called with no arguments');
    }
    super();
  }

  has(key) {
    assert.nonEmptyString(key);
    return super.has(key);
  }

  get(key) {
    assert.nonEmptyString(key);
    return super.get(key);
  }

  set(key, value) {
    assert.nonEmptyString(key);
    return super.set(key, value);
  }

  push(key, value) {
    assert.nonEmptyString(key);
    if (!Array.isArray(this.get(key))) {
      this.set(key, []);
    }
    this.get(key).push(value);
  }

  view(playerId = '') {
    assert.string(playerId);
    const entries = Array
      .from(this.entries())
      .map(([key, value]) => [key, getView(value, playerId)]);
    return Object.fromEntries(entries);
  }

  toJSON() {
    const entries = Array
      .from(this.entries())
      .map(([key, value]) => [key, toJSON(value)]);
    return Object.fromEntries(entries);
  }
}
