import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';

const Label = styled.label`
  display: block;
  margin: 5px 0 5px 0;
  text-transform: uppercase;
`;

const InputStyle = styled.div`
  background-color: #161416;
  display: inline-block;
  border-radius: 3px;
  display: flex;
  margin-right: 5px;
  border: 1px solid ${styles.colorMeta};
  transition: border 0.13s ease-out;
  width: ${p => {
    if (p.fluid) {
      return `100%`;
    }

    if (p.width) {
      return p.width;
    }
  }};
  &:hover {
    border: 1px solid ${styles.colorActive};
  }

  &:focus-within {
    border: 1px solid ${styles.colorActive};
  }

  & input {
    padding: 10px;
    font-family: 'Rajdhani', sans-serif;
    color: white;
    width: ${p => {
      if (p.fluid) {
        return `100%`;
      }

      if (p.width) {
        return p.width;
      }
    }};
    font-size: 14px;
    background-color: transparent;
    border: none;
    background-image: none;
    box-shadow: none;
    outline: none;
    margin: 0;
  }
`;

const Input = ({ width = '250px', label, fluid = false, ...rest }) => {
  return (
    <>
      {label ? <Label>{label}</Label> : null}
      <InputStyle width={width} fluid={fluid}>
        <input type="text" {...rest} />
      </InputStyle>
    </>
  );
};

Input.propTypes = {
  rest: PropTypes.any,
  width: PropTypes.string
};

export default Input;
