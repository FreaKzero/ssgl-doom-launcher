import PropTypes from 'prop-types';
import React from 'react';

import CheckMarkStyle from './CheckMarkStyle';
import collection from './Collection';

const CheckMark = ({ theme, active, size, onClick }) => {
  const ThemedCheckMark = collection[theme] || collection['hell'];
  return (
    <CheckMarkStyle onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 347 347"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
          <ThemedCheckMark />
        </g>
      </svg>
    </CheckMarkStyle>
  );
};

CheckMark.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string
};

export default CheckMark;
