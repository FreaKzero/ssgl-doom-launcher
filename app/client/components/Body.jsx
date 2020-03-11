import styled from 'styled-components';

import background from ' #/assets/ssglwall.png';

export default styled.div`
  font-family: 'Rajdhani', sans-serif;
  color: white;
  background: ${p =>
    p.background && p.background.trim() !== ''
      ? `url('file://${p.background}')`
      : `url(${background})`};
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center center;
`;
