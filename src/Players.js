import type from '@agte/type';
import Player from './Player.js';

export default class Players extends Map {
  constructor(items = []) {
    type.array(items);
    if (items.length === 0) {
      throw new Error('At least one player required');
    }
    items.forEach((item) => type.object(item));
    items.forEach((item) => type.nonEmptyString(item.id));

    super();
    items.forEach((item) => {
      const { id } = item;
      if (this.has(id)) {
        throw new Error('Duplicated id');
      }
      super.set(id, new Player({ ...item, id }));
    });
  }

  /* eslint-disable class-methods-use-this */
  set() {
    throw new Error('You cannot add players');
  }

  delete() {
    throw new Error('You cannot delete players');
  }

  clear() {
    throw new Error('You cannot delete players');
  }
  /* eslint-enable class-methods-use-this */

  toJSON() {
    return this.values().map((player) => player.toJSON());
  }

  nextAfter(playerId) {
    type.nonEmptyString(playerId);
    if (this.size === 0) {
      return null;
    }
    if (!this.has(playerId)) {
      return null;
    }

    const keys = Array.from(this.keys());
    const index = keys.indexOf(playerId);
    const nextIndex = index === this.size - 1 ? 0 : index + 1;
    const nextPlayerId = keys[nextIndex];
    return this.get(nextPlayerId);
  }
}
