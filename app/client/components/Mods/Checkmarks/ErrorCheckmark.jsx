import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const CheckMarkStyle = styled.div`
  cursor: pointer;

  .ring-outer {
    stroke: #ff2f00;
    transform-origin: center center;
    transform: scale(0.7);
    stroke-width: 20;
  }

  .ring-inner {
    stroke-width: 30;
    stroke: #ff2f00;
    r: 15;
    transition: all 0.2s ease-out;
  }

  .pent {
    opacity: 1;
    transition: all 0.15s ease-out;
    transform-origin: center center;
    fill: #f55945;
  }
`;

const ErrorCheckmark = ({ size, onClick }) => {
  return (
    <CheckMarkStyle onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 347 347"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={'error'}
      >
        <g className="ring-outer">
          <path d="M183.5 43.5H164L174 11L183.5 43.5Z" />
          <path d="M183.5 304H164L174 336.5L183.5 304Z" />
          <path d="M43.5 164L43.5 183.5L11 173.5L43.5 164Z" />
          <path d="M304 164L304 183.5L336.5 173.5L304 164Z" />
          <circle cx="174" cy="174" r="129" />
        </g>

        <g className="pent">
          <path d="M231 129.896L218.104 117L174 161.104L129.896 117L117 129.896L161.104 174L117 218.104L129.896 231L174 186.896L218.104 231L231 218.104L186.896 174L231 129.896Z" />
        </g>
      </svg>
    </CheckMarkStyle>
  );
};

ErrorCheckmark.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.string
};

export default ErrorCheckmark;
