import React from 'react';
import styled from 'styled-components';
import styles from '#Style';

const PlayIconStyle = styled.div`
  position: absolute;
  right: 30px;
  bottom: 20px;
  cursor: pointer;

  &:hover .active .play {
    stroke: ${styles.colorActive};
  }

  &:hover .active .ring-outer {
    transform: rotate(135deg);
  }

  .ring-outer {
    stroke: #5f100f;
    transform-origin: center center;
    transform: scale(0.1);
    transition: all 0.35s cubic-bezier(0.45, -0.79, 0, 1.77);
    opacity: 0;
  }

  .active .ring-outer {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }

  .ring-inner {
    stroke-width: 0;
    opacity: 0;
    stroke: #ffa800;
    r: 15;
    transition: all 0.2s ease-out;
  }

  .active .ring-inner {
    opacity: 1;
    stroke-width: 15;
    stroke: #5f100f;
    r: 105;
  }

  .backdrop {
    transform-origin: center center;
    transform: scale(0);
    transition: all 0.2s cubic-bezier(0.45, -0.79, 0, 1.77);
  }

  .active .backdrop {
    transform: scale(1);
  }

  .play {
    opacity: 0;
    stroke: ${styles.colorMeta};
    transition: ${styles.transitionShort};
  }
  .active .play {
    opacity: 1;
  }
`;

const PlayIcon = ({ active, onClick }) => {
  return (
    <PlayIconStyle>
      <svg
        width="70"
        height="70"
        viewBox="0 0 347 347"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={active ? 'active' : undefined}
        onClick={onClick}
      >
        <circle r="130" cx="174" cy="174" fill="black" className="backdrop" />
        <g className="ring-outer">
          <path
            d="M183.5 43.5H164L174 11L183.5 43.5Z"
            stroke="#FFA800"
            strokeWidth="6"
          />
          <path
            d="M183.5 304H164L174 336.5L183.5 304Z"
            stroke="#FFA800"
            strokeWidth="6"
          />
          <path
            d="M43.5 164L43.5 183.5L11 173.5L43.5 164Z"
            stroke="#FFA800"
            strokeWidth="6"
          />
          <path
            d="M304 164L304 183.5L336.5 173.5L304 164Z"
            stroke="#FFA800"
            strokeWidth="6"
          />
          <circle cx="174" cy="174" r="129" stroke="#FFA800" strokeWidth="6" />
        </g>
        <circle className="ring-inner" cx="174" cy="174" r="129" />

        <path
          d="M145.126 133.015L221.765 171.686C223.605 172.614 223.595 175.244 221.749 176.158L145.11 214.126C143.448 214.949 141.5 213.74 141.5 211.886V135.247C141.5 133.384 143.463 132.176 145.126 133.015Z"
          strokeWidth="15"
          className="play"
        />
      </svg>
    </PlayIconStyle>
  );
};

export default PlayIcon;
