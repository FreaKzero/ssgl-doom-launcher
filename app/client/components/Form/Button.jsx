import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import spinner from '#Asset/icon/spinner.svg';
import Svg from 'react-svg-inline';

const SpinnerStyle = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    fill: ${styles.color.active};
    margin-bottom: -2px;
    animation: spin 0.7s infinite;
    filter: drop-shadow(0px -1px 4px #ff0000) drop-shadow(0px 0px 10px #ff0000);
  }
`;

export const ButtonStyle = styled.button`
  background: ${p =>
    p.disabled
      ? '#1d2025'
      : 'linear-gradient(180deg, #3f464c 0%, #1d2025 100%);'};
  border: 1px solid #1d2226;
  box-sizing: border-box;
  border-radius: 4px;
  text-transform: uppercase;
  min-width: 100px;
  width: ${p => (p.fluid ? '100%' : p.width ? p.width : 'auto')};
  padding: 7px;
  cursor: pointer;
  transition: ${styles.transition.out};
  color: #808080;
  text-shadow: -1px -1px 5px #1d2226;
  margin-right: 10px;
  &:hover {
    border: ${p =>
      p.border
        ? `1px solid ${p.border};`
        : `1px solid ${styles.border.active};`};
    color: ${p => (p.color ? `${p.color};` : `${styles.color.active};`)};
    text-shadow: ${p =>
      p.glow
        ? `0 0px 5px ${p.glow}, 0 0px 15px ${p.glow};`
        : `0 0px 5px #ff0000, 0 0px 15px #ff0000;`};
  }
`;

const Button = ({
  width = '170px',
  type = 'button',
  onClick,
  children,
  load = false,
  disabled = false,
  ...rest
}) => {
  return (
    <ButtonStyle
      {...rest}
      type={type}
      onClick={onClick}
      load={load}
      width={width}
      disabled={load || disabled}
    >
      {load ? (
        <SpinnerStyle>
          <Svg component="div" svg={spinner} height="15" />
        </SpinnerStyle>
      ) : (
        [children]
      )}
    </ButtonStyle>
  );
};

export default Button;
