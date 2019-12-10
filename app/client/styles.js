import { createGlobalStyle } from 'styled-components';

import Michroma from './assets/fonts/Michroma.woff';
import Rajdhani from './assets/fonts/Rajdhani-Regular.woff';

const styles = {
  font: {
    content: "font-family: 'Michroma', sans-serif;",
    head: "font-family: 'Rajdhani', sans-serif;"
  },
  svg: {
    red: '#5f100f',
    yellow: '#ffa800',
    grey: '#6f6f6f'
  },
  transition: {
    out: 'all 0.25s ease-out',
    in: 'all 0.25s ease-in',
    short: 'all 0.15s ease-out',
    bounce: 'all 0.2s cubic-bezier(0.45, -0.79, 0, 1.77)'
  },
  color: {
    active: '#ffa800',
    meta: '#6f6f6f',
    idle: '#fff',
    grey: '#6f6f6f',
    backdrop: 'rgba(12, 8, 8, 0.8)',
    red: '#5f100f'
  },
  border: {
    radius: '4px',
    active: '#ffa800',
    idle: '#6f6f6f',
    red: '#5f100f'
  },
  back: 'rgba(12, 8, 8, 0.8)',
  scrollbar: `
  &::-webkit-scrollbar { 
    width: 7px;
    background-color: rgba(12, 8, 8, 0.8);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ffa800;
  }
  `
};

export const GlobalStyle = createGlobalStyle`

html, body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

@font-face {
  font-family: 'Michroma';
  src: url('${Michroma}') format('woff');
}

@font-face {
  font-family: 'Rajdhani';
  src: url('${Rajdhani}') format('woff');
}

* {
  color: white;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;
export default styles;
