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
    if (value.toJSON && typeof toJSON === 'function') {
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
  view(playerId) {
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
