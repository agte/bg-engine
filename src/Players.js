import type from '@agte/type';
import Items from './Items.js';
import Player from './Player.js';

export default class Players extends Items {
  constructor(players = [], PlayerClass = Player) {
    if (!players.length) {
      throw new Error('At least one player required');
    }
    type.class(PlayerClass);
    if (PlayerClass !== Player && !Object.prototype.isPrototypeOf.call(Player, PlayerClass)) {
      throw new TypeError('Argument "PlayerClass" must extend class "Player" or must be assigned to it');
    }
    super(players, PlayerClass);
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
}
