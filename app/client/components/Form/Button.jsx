import PropTypes from 'prop-types';
import React from 'react';
import Svg from 'react-svg-inline';
import styled from 'styled-components';

import spinner from '#/assets/icon/spinner.svg';

const SpinnerStyle = styled.div`
  svg {
    fill: ${({ theme }) => theme.color.active};
    filter: ${({ theme }) => theme.svg.glow};
    margin-bottom: -2px;
    animation: spin 0.7s infinite;
  }
`;

export const ButtonStyle = styled.button`
  color: ${({ theme }) => theme.button.idle};
  transition: ${({ theme }) => theme.transition.out};
  width: ${p => (p.fluid ? '100%' : p.width ? p.width : 'auto')};
  border: 1px solid ${({ theme }) => theme.border.idle};
  background: ${p =>
    p.disabled ? p.theme.button.disabled : p.theme.button.back};
  text-shadow: ${({ theme }) => theme.button.shadow};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.border.radius};
  text-transform: uppercase;
  min-width: 100px;
  padding: 7px;
  cursor: pointer;
  margin-right: 10px;
  white-space: nowrap;

  &:hover {
    border: ${p =>
      p.border
        ? `1px solid ${p.border};`
        : `1px solid ${p.theme.border.active};`};
    color: ${p => (p.color ? `${p.color};` : `${p.theme.color.active};`)};
    text-shadow: ${p =>
      p.glow
        ? `0 0px 5px ${p.glow}, 0 0px 15px ${p.glow};`
        : `0 0px 5px ${p.theme.color.glow}, 0 0px 15px ${p.theme.color.glow};`};
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

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  load: PropTypes.bool,
  onClick: PropTypes.any,
  type: PropTypes.string,
  width: PropTypes.string
};

export default Button;
