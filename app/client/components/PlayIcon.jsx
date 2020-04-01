import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const PlayIconStyle = styled.div`
  position: absolute;
  right: 30px;
  bottom: 20px;
  cursor: pointer;
  pointer-events: none;

  .ring-outer {
    transition: ${({ theme }) => theme.transition.bouncelong};
    transform-origin: center center;
    transform: scale(0.1);
    opacity: 0;
    stroke-width: 9;
  }

  .ring-inner {
    transition: ${({ theme }) => theme.transition.out};
    stroke: ${({ theme }) => theme.svg.bright};
    stroke-width: 0;
    opacity: 0;
    r: 15;
  }

  .play {
    stroke: ${({ theme }) => theme.svg.grey};
    transform-origin: center center;
    opacity: 0;
    transform: scale(0);
    transition: all 0.35s cubic-bezier(0.45, -0.79, 0, 1.77);
  }

  .active {
    pointer-events: auto;
  }

  .active .play {
    transform: scale(1);
    opacity: 1;
  }

  .active .ring-outer {
    stroke: ${({ theme }) => theme.svg.dark};
    transform: scale(1);
    opacity: 1;
  }

  .active .ring-inner {
    stroke: ${({ theme }) => theme.svg.dark};
    stroke-width: 15;
    r: 60;
    opacity: 0;
  }

  &:hover .active .play {
    stroke: ${({ theme }) => theme.svg.bright};
  }

  &:hover .active .ring-outer {
    transform: rotate(45deg);
    stroke: ${({ theme }) => theme.svg.bright};
  }

  &:hover .active .ring-inner {
    r: 90;
    opacity: 1;
  }

  .backdrop {
    transition: ${({ theme }) => theme.transition.bounce};
    transform-origin: center center;
    transform: scale(0);
    fill: black;
    opacity: 0.3;
  }

  .active .backdrop {
    transform: scale(1);
  }
`;

const PlayIcon = ({ active, onClick }) => {
  return (
    <PlayIconStyle active={active}>
      <svg
        width="70"
        height="70"
        viewBox="0 0 347 347"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={active ? 'active' : undefined}
        onClick={onClick}
      >
        <circle r="130" cx="174" cy="174" className="backdrop" />
        <g className="ring-outer">
          <path d="M183.5 43.5H164L174 11L183.5 43.5Z" />
          <path d="M183.5 304H164L174 336.5L183.5 304Z" />
          <path d="M43.5 164L43.5 183.5L11 173.5L43.5 164Z" />
          <path d="M304 164L304 183.5L336.5 173.5L304 164Z" />
          <circle cx="174" cy="174" r="129" />
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

PlayIcon.propTypes = {
  active: PropTypes.any,
  onClick: PropTypes.func.isRequired
};

export default PlayIcon;
