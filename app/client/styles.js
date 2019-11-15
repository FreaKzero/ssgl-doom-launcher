import { createGlobalStyle } from 'styled-components';

import Michroma from './assets/fonts/Michroma.woff';
import Rajdhani from './assets/fonts/Rajdhani-Regular.woff';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Michroma';
  src: url('${Michroma}') format('woff');
}

@font-face {
  font-family: 'Rajdhani';
  src: url('${Rajdhani}') format('woff');
}
`;

const styles = {
  colorActive: '#ffa800',
  colorMeta: '#6f6f6f',
  transitionLong: 'all 0.3s ease-out',
  transitionShort: 'all 0.25s ease-in',
  back: 'rgba(12, 8, 8, 0.8)',
  scrollbar: `
  &::-webkit-scrollbar {
    width: 12px;
    background-color: rgba(12, 8, 8, 0.8);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ffa800;
  }
  `
};

export default styles;
