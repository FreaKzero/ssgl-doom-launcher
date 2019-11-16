/* eslint-disable no-case-declarations */
import { act } from './middlewares';

export const initState = {
  mods: [],
  selected: []
};

export function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return act({ ...state, mods: action.data });
    case 'select-mod':
      const newItem = state.mods.find(item => action.id === item.id);
      newItem.active = !newItem.active;

      const found = state.selected.findIndex(item => action.id === item.id);

      if (found > -1) {
        state.selected.splice(found, 1);
      } else {
        state.selected.push(newItem);
      }

      return act({
        ...state,
        selected: state.selected,
        mods: state.mods.map(item => (item.id === action.id ? newItem : item))
      });

    default:
      return initState;
  }
}
