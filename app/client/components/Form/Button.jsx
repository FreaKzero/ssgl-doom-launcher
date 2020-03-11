import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import spinner from ' #/assets/icon/spinner.svg';
import Svg from 'react-svg-inline';

const SpinnerStyle = styled.div`
  svg {
    fill: ${styles.color.active};
    filter: ${styles.svg.glow};
    margin-bottom: -2px;
    animation: spin 0.7s infinite;
  }
`;

export const ButtonStyle = styled.button`
  color: ${styles.button.idle};
  transition: ${styles.transition.out};
  width: ${p => (p.fluid ? '100%' : p.width ? p.width : 'auto')};
  border: 1px solid ${styles.border.idle};
  background: ${p =>
    p.disabled ? styles.button.disabled : styles.button.back};
  text-shadow: ${styles.button.shadow};
  box-sizing: border-box;
  border-radius: ${styles.border.radius};
  text-transform: uppercase;
  min-width: 100px;
  padding: 7px;
  cursor: pointer;
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
        : `0 0px 5px ${styles.color.glow}, 0 0px 15px ${styles.color.glow};`};
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
