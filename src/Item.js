import type from '@agte/type';
import StringSet from './StringSet.js';

export default class Item {
  constructor({ id, whiteList = [] }) {
    type.nonEmptyString(id);
    Object.defineProperty(this, 'id', { value: id });
    Object.defineProperty(this, 'whiteList', { value: new StringSet(whiteList) });
  }

  toJSON() {
    return {
      id: this.id,
      whiteList: this.whiteList.toJSON(),
    };
  }

  getView(playerId = '*') {
    type.nonEmptyString(playerId);
    return (this.whiteList.has('*') || (playerId !== '*' && this.whiteList.has(playerId)))
      ? {
        id: this.id,
        visible: true,
      }
      : {
        id: this.id,
        visible: false,
      };
  }
}
