import { act } from './middlewares';

export const initState = { wat: 'rly' };

export function reducer(state, action) {
  switch (action.type) {
    case 'create':
      return act({});
    default:
      return initState;
  }
}
