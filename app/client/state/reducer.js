/* eslint-disable no-case-declarations */
import { act } from './middlewares';

export const move = (data, from, to) => {
  const array = data.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
};

export const removeIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1)
];

export const initState = {
  iwads: [],
  mods: [],
  update: {
    available: false,
    download: null,
    version: null,
    date: null,
    prerelease: null,
    changelog: null
  },
  package: {
    datapath: null,
    id: null,
    sourceport: null,
    iwad: null,
    cover: null,
    name: null,
    selected: []
  },
  packages: [],
  sourceports: [],
  settings: {
    theme: 'hell',
    startView: '/',
    language: 'en',
    defaultsourceport: '',
    modpath: '',
    savepath: '',
    background: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case 'main/init':
      return act({ ...state, ...action.data, package: initState.package });

    case 'update/done':
      return act({
        ...state,
        update: {
          ...state.update,
          available: false
        }
      });

    case 'update/set':
      return act({
        ...state,
        update: action.data
      });

    case 'sourceports/save':
      return act({
        ...state,
        sourceports: action.data
      });

    case 'settings/save':
      return act({
        ...state,
        settings: action.data
      });

    case 'packages/delete':
      return act({
        ...state,
        package: initState.package,
        packages: action.packages,
        mods: state.mods.map(mod => ({ ...mod, active: false }))
      });

    case 'packages/reset':
      return act({
        ...state,
        package: initState.package,
        mods: state.mods.map(mod => ({ ...mod, active: false }))
      });

    case 'packages/select':
      const pack = state.packages.find(pack => pack.id === action.id);
      const mods = state.mods.map(mod => {
        if (pack.selected.findIndex(item => mod.id === item.id) > -1) {
          return {
            ...mod,
            active: true
          };
        } else {
          return {
            ...mod,
            active: false
          };
        }
      });

      return act({
        ...state,
        mods: mods,
        package: {
          ...pack,
          selected: pack.selected
        }
      });

    case 'packages/save':
      return act({
        ...state,
        packages: action.packages,
        package: action.package || initState.package
      });

    case 'mod/move':
      const to =
        action.direction === 'up' ? action.index - 1 : action.index + 1;

      return act({
        ...state,
        package: {
          ...state.package,
          selected: move(state.package.selected, action.index, to)
        }
      });

    case 'mod/select':
      const newItem = state.mods.find(item => action.id === item.id);

      if (!newItem) {
        return act(state);
      }

      newItem.active = !newItem.active;

      const found = state.package.selected.findIndex(
        item => action.id === item.id
      );

      const selected =
        found > -1
          ? removeIndex(state.package.selected, found)
          : [...state.package.selected, newItem];

      return act({
        ...state,
        package: {
          ...state.package,
          selected
        },
        mods: state.mods.map(item => (item.id === action.id ? newItem : item))
      });

    default:
      return initState;
  }
}
