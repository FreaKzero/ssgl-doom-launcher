import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';

const IconStyle = styled.div`
  cursor: pointer;

  .ring-outer {
    stroke: ${styles.svg.red};
    transition: ${styles.transition.bounce};
    transform-origin: center center;
    transform: scale(0.7);
    stroke-width: 20;
  }

  .ring-inner {
    stroke-width: 30;
    stroke: ${styles.svg.red};
    r: 15;
    transition: all 0.2s ease-out;
  }

  .pent {
    opacity: 0;
    transition: all 0.15s ease-out;
    transform: scale(0.1);
    transform-origin: center center;
  }

  .active .ring-outer {
    stroke: ${styles.svg.yellow};
    transform: rotate(45deg) scale(1);
    stroke-width: 12;
  }

  .active .ring-inner {
    stroke-width: 20;
    stroke: ${styles.svg.red};
    r: 80;
  }

  .active .pent {
    opacity: 1;
    transform: scale(1);
  }

  &:hover .ring-inner {
    stroke: ${styles.svg.yellow};
  }

  & .active:hover .ring-inner {
    stroke: ${styles.svg.red};
  }
`;

const Check = ({ active, size, onClick }) => {
  return (
    <IconStyle onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 347 347"
        fill="none"
        className={active ? 'active' : undefined}
      >
        <g className="ring-outer">
          <path d="M183.5 43.5H164L174 11L183.5 43.5Z" />
          <path d="M183.5 304H164L174 336.5L183.5 304Z" />
          <path d="M43.5 164L43.5 183.5L11 173.5L43.5 164Z" />
          <path d="M304 164L304 183.5L336.5 173.5L304 164Z" />
          <circle cx="174" cy="174" r="129" />
        </g>

        <circle className="ring-inner" transform="matrix(1 0 0 -1 174 174)" />
        <g className="pent">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M172.893 277.482L235.321 90L172.368 132.836L110.464 90.5673L172.893 277.482ZM173.424 247.133L129.591 114.68L173.165 145.599L216.998 114.68L173.424 247.133Z"
            fill="#FFA800"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M274.077 203.259L181.932 139.643L162.805 139.643L74 202.447L274.077 203.259ZM240.11 192.676L104.626 192.676L173.424 144.748L240.11 192.676Z"
            fill="#FFA800"
          />
        </g>
      </svg>
    </IconStyle>
  );
};

Check.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string
};

export default Check;
