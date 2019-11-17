import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
const InputStyle = styled.div`
  background-color: #161416;
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  margin-right: 5px;
  width: ${p => p.width};
  border: 1px solid ${styles.colorMeta};

  &:hover {
    border: 1px solid ${styles.colorActive};
  }

  &:focus-within {
    border: 1px solid ${styles.colorActive};
  }

  & input {
    font-family: 'Rajdhani', sans-serif;
    width: 100%;
    color: white;
    font-size: 14px;
    background-color: transparent;
    border: none;
    background-image: none;
    box-shadow: none;
    outline: none;
    margin: 0;
  }
`;

const Input = ({ width, ...rest }) => {
  return (
    <InputStyle width={width}>
      <input type="text" {...rest} />
    </InputStyle>
  );
};

Input.propTypes = {
  rest: PropTypes.any,
  width: PropTypes.string
};

export default Input;
