import styled from 'styled-components';

const BackDrop = styled.div`
  @keyframes backdrop {
    0% {
      height: 0;
    }

    5% {
      height: 100vh;
    }

    100% {
      height: 100vh;
      backdrop-filter: blur(5px);
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 0;
  backdrop-filter: blur(0);
  animation-fill-mode: forwards;
  animation-name: ${p => (p.active ? 'backdrop' : undefined)};
`;

export default BackDrop;
