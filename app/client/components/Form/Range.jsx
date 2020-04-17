import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Label from './Label';

const Wrapper = styled.div`
  color: red;
  flex-wrap: wrap;
  position: relative;
  cursor: pointer;
  padding: 10px 0 20px 0;

  input {
    margin: 0;
    padding: 0;
    appearance: none;
    width: 100%;
    height: 15px;
    outline: none;
    background-color: ${({ theme }) => theme.color.backdrop};
    border-radius: ${({ theme }) => theme.border.radius};
    border: ${p => `1px solid ${p.theme.border.idle}`};

    &::-webkit-slider-thumb {
      appearance: none;
      width: 15px;
      height: 35px;
      border: 1px solid ${({ theme }) => theme.border.idle};
      background: ${p =>
        p.disabled ? p.theme.button.disabled : p.theme.button.back};
      box-sizing: border-box;
      border-radius: ${({ theme }) => theme.border.radius};
      cursor: pointer;
      transition: ${({ theme }) => theme.transition.out};

      &:hover {
        background: ${({ theme }) =>
          `linear-gradient(180deg, #3f464c 0%, ${theme.color.active} 100%)`};
        border: 1px solid ${({ theme }) => theme.color.active};
      }
    }
  }
`;

const Dropdown = ({
  min,
  max,
  label,
  value,
  name,
  error = null,
  info = null,
  onChange,
  step
}) => {
  return (
    <>
      {label ? <Label info={info}>{label}</Label> : null}
      <span> ({value})</span>
      {error ? <Label error>{error}</Label> : null}
      <Wrapper error={error}>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          name={name}
        ></input>
      </Wrapper>
    </>
  );
};

Dropdown.propTypes = {
  step: PropTypes.any,
  max: PropTypes.any,
  min: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  info: PropTypes.string
};

export default Dropdown;
