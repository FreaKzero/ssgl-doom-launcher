import { createGlobalStyle } from 'styled-components';

import Michroma from './assets/fonts/Michroma.woff';
import Rajdhani from './assets/fonts/Rajdhani-Regular.woff';

const styles = {
  colorActive: '#ffa800',
  colorMeta: '#6f6f6f',
  transitionLong: 'all 0.3s ease-out',
  transitionShort: 'all 0.25s ease-in',
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
