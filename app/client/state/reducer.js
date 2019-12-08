/* eslint-disable no-case-declarations */
import { act } from './middlewares';

export const move = (data, from, to) => {
  const array = data.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
};

export const initState = {
  mods: [],
  selected: [],
  sourceports: [],
  settings: {}
};

export function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return act({ ...state, ...action.data });
    case 'settings/save':
      return act({
        ...state,
        settings: action.data
      });
    case 'mod/move':
      const to =
        action.direction === 'up' ? action.index - 1 : action.index + 1;

      return act({
        ...state,
        selected: move(state.selected, action.index, to)
      });

    case 'mod/select':
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
