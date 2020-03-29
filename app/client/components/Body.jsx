import styled from 'styled-components';

import background from '#/assets/ssglwall.png';

import { image } from '../utils';

export default styled.div`
  font-family: 'Rajdhani', sans-serif;
  color: white;
  background: ${p =>
    p.background && p.background.trim() !== ''
      ? `url("file://${image(p.background)}")`
      : `url(${background})`};
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center center;
`;
