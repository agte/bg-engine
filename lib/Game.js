import mustBe from '@agte/type/mustBe';
import Items from './Items.js';
import Player from './Player.js';
import State from './State.js';

/* global PlayerData */
/**
 * @typedef {object} GameData
 * @property {Array.<PlayerData>} players
 * @property {boolean} finished
 */

export default class Game {
  /**
   * @type {Array.<Player>}
   * @private
   */
  #players;

  /**
   * @member {Array.<Player>} players
   * @readonly
   */

  get players() {
    return this.#players;
  }

  /**
   * @type {boolean}
   * @private
   */
  #finished;

  /**
   * @member {boolean} finished
   */

  get finished() {
    return this.#finished;
  }

  set finished(value) {
    mustBe.boolean(value);
    this.#finished = value;
  }

  /**
   * @member {State} state
   * @readonly
   */

  get state() {
    const state = new State();
    state.set('players', this.players);
    state.set('finished', this.finished);
    return state; // full state
  }

  /**
   * @param {GameData=} data
   */
  constructor({ players = [], finished = false } = {}) {
    mustBe.array(players);
    if (players.length === 0) {
      throw new Error('At least one player required');
    }
    this.#players = new Items(players, Player);
    this.finished = finished;
  }

  /**
   * @returns {GameData}
   */
  toJSON() {
    return this.state.toJSON();
  }

  /**
   * @param {string} playerId
   * @param {string} action
   * @param {object} options
   * @returns {State} Diff state
   */
  move(playerId, action, options = {}) {
    mustBe.nonEmptyString(playerId);
    mustBe.nonEmptyString(action);
    mustBe.object(options);

    const player = this.players.get(playerId);
    if (!player) {
      throw new Error('Wrong player id');
    }

    if (typeof this[action] !== 'function') {
      throw new Error('Action not implemented');
    }

    if (this.finished) {
      throw new Error('The game is finished');
    }

    if (!player.actions.has(action)) {
      throw new Error('Disallowed action');
    }

    const diff = new State(); // partial state

    this[action](player, options, diff);

    return diff;
  }
}
