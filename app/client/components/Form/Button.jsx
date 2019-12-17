import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';

export const ButtonStyle = styled.button`
  background: linear-gradient(180deg, #3f464c 0%, #1d2025 100%);
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
  width = '250px',
  type = 'button',
  onClick,
  children,
  ...rest
}) => {
  return (
    <ButtonStyle type={type} onClick={onClick} {...rest}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
