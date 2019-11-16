import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.div`
  background-color: #161416;
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  & input {
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

const Input = props => {
  return (
    <InputStyle>
      <input type="text" {...props} />
    </InputStyle>
  );
};

export default Input;
