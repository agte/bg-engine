import type from '@agte/type';
import StringSet from './StringSet.js';
import Item from './Item.js';

const getProperties = (object, propNames) => {
  const entries = propNames.map((key) => [key, object[key]]);
  return Object.fromEntries(entries);
};

export default class Card extends Item {
  constructor({ whiteList = [], ...others }) {
    super(others);
    Object.defineProperty(this, 'whiteList', { value: new StringSet(whiteList) });
  }

  toJSON() {
    return {
      id: this.id,
      whiteList: this.whiteList.toJSON(),
    };
  }

  view(playerId = '') {
    type.string(playerId);
    const canViewFrontSide = this.whiteList.has('*') || (playerId !== '' && this.whiteList.has(playerId));
    return canViewFrontSide
      ? {
        id: this.id,
        side: 'front',
        ...getProperties(this, this.constructor.publicProperties),
        ...getProperties(this, this.constructor.privateProperties),
      }
      : {
        id: this.id,
        side: 'back',
        ...getProperties(this, this.constructor.publicProperties),
      };
  }

  static get privateProperties() {
    return [];
  }

  static get publicProperties() {
    return [];
  }
}
