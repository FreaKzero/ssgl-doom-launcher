import styled from 'styled-components';

const CheckMarkStyle = styled.div`
  cursor: pointer;

  .ring-outer {
    stroke: ${({ theme }) => theme.svg.dark};
    transition: ${({ theme }) => theme.transition.bounce};
    transform-origin: center center;
    transform: scale(0.7);
    stroke-width: 20;
  }

  .ring-inner {
    stroke-width: 30;
    stroke: ${({ theme }) => theme.svg.dark};
    r: 15;
    transition: all 0.2s ease-out;
  }

  .pent {
    opacity: 0;
    transition: all 0.15s ease-out;
    transform: scale(0.1);
    transform-origin: center center;
    fill: ${({ theme }) => theme.svg.bright};
  }

  .active .ring-outer {
    stroke: ${({ theme }) => theme.svg.bright};
    transform: rotate(45deg) scale(1);
    stroke-width: 12;
  }

  .active .ring-inner {
    stroke-width: 20;
    stroke: ${({ theme }) => theme.svg.dark};
    r: 80;
  }

  .active .pent {
    opacity: 1;
    transform: scale(1);
  }

  &:hover .ring-inner {
    stroke: ${({ theme }) => theme.svg.bright};
  }

  & .active:hover .ring-inner {
    stroke: ${({ theme }) => theme.svg.dark};
  }
`;

export default CheckMarkStyle;
