import React from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../utils';

const LoaderStyle = styled.div`
  padding: 15px 0 15px 0;

  @keyframes roll-outer {
    0% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes roll-inner {
    0% {
      transform: rotate(-180deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes breathe-tiny {
    0% {
      text-shadow: ${({ theme }) =>
        `0 -1px 4px ${theme.color.glow}, 0 0px 10px ${theme.color.glow}, 0 0px 15px ${theme.color.glow}`};
      opacity: 1;
    }

    50% {
      text-shadow: none;
      opacity: 0.3;
    }

    100% {
      text-shadow: ${({ theme }) =>
        `0 -1px 4px ${theme.color.glow}, 0 0px 10px ${theme.color.glow}, 0 0px 15px ${theme.color.glow}`};
      opacity: 1;
    }
  }

  .svgcontainer {
    width: 100px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  h3 {
    text-align: center;
    font-size: 16px;
    text-transform: uppercase;
    animation-iteration-count: infinite;
    animation-name: breathe-tiny;
    animation-duration: 1.32s;
    animation-timing-function: ease-out;
    transform-origin: center center;
  }

  .bullets {
    fill: ${({ theme }) => theme.border.active};
  }

  .bullets-outer {
    animation-iteration-count: infinite;
    animation-name: roll-outer;
    animation-duration: 0.85s;
    animation-timing-function: ease-out;
    transform-origin: center center;
  }

  .bullets-inner {
    animation-iteration-count: infinite;
    animation-name: roll-inner;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    transform-origin: center center;
  }

  .rings {
    stroke: ${({ theme }) => theme.border.active};
  }
`;
const Loader = () => {
  const { t } = useTranslation(['oblige']);
  return (
    <LoaderStyle>
      <div className="svgcontainer">
        <svg
          width="80"
          height="80"
          viewBox="0 0 293 292"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="bullets-outer bullets">
            <circle cx="146.5" cy="17.5" r="17.5" />
            <circle cx="275" cy="146" r="17.5" transform="rotate(90 275 146)" />
            <circle cx="146.5" cy="274.5" r="17.5" />
            <circle cx="18" cy="146" r="17.5" transform="rotate(90 18 146)" />
          </g>
          <g className="bullets-inner bullets">
            <circle
              cx="206.749"
              cy="90.7487"
              r="17.5"
              transform="rotate(45 206.749 90.7487)"
            />
            <circle
              cx="206.749"
              cy="203.749"
              r="17.5"
              transform="rotate(135 206.749 203.749)"
            />
            <circle
              cx="86.7488"
              cy="203.749"
              r="17.5"
              transform="rotate(45 86.7488 203.749)"
            />
            <circle
              cx="86.7488"
              cy="90.7488"
              r="17.5"
              transform="rotate(135 86.7488 90.7488)"
            />
          </g>
          <circle
            cx="147"
            cy="146"
            r="129"
            strokeWidth="6"
            className="ring-outer rings"
          />
          <circle
            cx="146.82"
            cy="146"
            r="81.5342"
            strokeWidth="6"
            className="ring-inner rings"
          />
        </svg>
      </div>
      <h3>{t('oblige:buildMessage')}</h3>
    </LoaderStyle>
  );
};

export default Loader;
