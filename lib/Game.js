import State from './State.js';

/**
 * @interface Game
 * @param {object} data
 */

/**
 * @function Game#toJSON
 * @returns {object} data applicable for constructor
 */

/**
 * @function Game#getState
 * @returns {State} Full state
 */

/**
 * @function
 * @name Game#move
 * @param {string} playerId
 * @param {string} action
 * @param {object} options
 * @returns {State} Diff state
 */

/**
 * @function
 * @name Game.create
 * @param {object=} options
 * @returns {Game} Game instance
 * @static
 */
