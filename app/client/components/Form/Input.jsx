import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import Label from './Label';

export const InputStyle = styled.input`
  padding: 7px 7px 7px 10px;
  font-family: ${styles.font.content};
  color: ${styles.color.idle};
  width: 100%;
  font-size: 16px;
  background-color: transparent;
  border: none;
  background-image: none;
  box-shadow: none;
  outline: none;
  margin: 0;

  &::placeholder {
    user-select: none;
  }
`;

export const InputContainerStyle = styled.div`
  margin-bottom: 15px;
  background-color: ${styles.color.backdrop};
  border-radius: ${styles.border.radius};
  display: flex;
  margin-right: 5px;
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  width: ${p => {
    if (p.fluid) {
      return `100%`;
    }

    if (p.width) {
      return p.width;
    }
  }};

  &:hover {
    border: 1px solid ${styles.border.active};
  }

  &:focus-within {
    border: 1px solid ${styles.border.active};
  }
`;

const Input = ({
  width = '250px',
  label,
  onChange,
  fluid = false,
  ...rest
}) => {
  const inputRef = useRef(null);
  const onChangeWrap = e => onChange(e, inputRef.current);

  return (
    <>
      {label ? <Label>{label}</Label> : null}
      <InputContainerStyle width={width} fluid={fluid}>
        <InputStyle
          ref={inputRef}
          type="text"
          onChange={onChangeWrap}
          {...rest}
        />
      </InputContainerStyle>
    </>
  );
};

Input.propTypes = {
  fluid: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string
};

export default Input;
