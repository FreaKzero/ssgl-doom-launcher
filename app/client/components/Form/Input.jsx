import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import styled from 'styled-components';

import Label from './Label';
export const InputStyle = styled.input`
  font-family: ${({ theme }) => theme.font.content};
  color: ${({ theme }) => theme.color.idle};
  padding: 7px 7px 7px 10px;
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
  background-color: ${({ theme }) => theme.color.backdrop};
  border-radius: ${({ theme }) => theme.border.radius};
  border: ${p =>
    p.error
      ? `1px solid ${p.theme.border.red};`
      : `1px solid ${p.theme.border.idle};`};
  transition: ${({ theme }) => theme.transition.out};
  margin-bottom: 15px;
  display: flex;
  margin-right: 5px;
  width: ${p => {
    if (p.fluid) {
      return `100%`;
    }

    if (p.width) {
      return p.width;
    }
  }};

  .fu {
    margin-top: 5px;
    margin-right: 5px;
    padding: 5px;
    transition: ${({ theme }) => theme.transition.short};
    stroke: ${({ theme }) => theme.button.idle};
    cursor: pointer;
  }

  .fu:hover {
    filter: ${({ theme }) => theme.svg.glow};
    stroke: ${({ theme }) => theme.color.active};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.border.active};
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.border.active};
  }
`;

const Input = ({
  width = '250px',
  label,
  onChange,
  onClear,
  error = null,
  fluid = false,
  info = null,
  shortcut = '',
  value,
  ...rest
}) => {
  const inputRef = useRef(null);

  if (shortcut.trim() !== '') {
    useHotkeys(shortcut, () => inputRef.current.focus());
    useHotkeys('escape', () => inputRef.current.blur(), { filter: () => true });
  }

  const onChangeWrap = e => onChange(e, inputRef.current);

  const Checked = ({ size, ...rest }) => (
    <svg
      className="fu"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M1 1.00003L11 11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.00003 11L11 1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  Checked.propTypes = {
    size: PropTypes.number
  };

  return (
    <>
      {label ? <Label info={info}>{label}</Label> : null}
      {error ? <Label error>{error}</Label> : null}
      <InputContainerStyle width={width} fluid={fluid} error={error}>
        <InputStyle
          ref={inputRef}
          type="text"
          onChange={onChangeWrap}
          value={value}
          {...rest}
        />
        {onClear && value.length ? (
          <Checked size="14" onClick={onClear} />
        ) : null}
      </InputContainerStyle>
    </>
  );
};

Input.propTypes = {
  fluid: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.any,
  width: PropTypes.string,
  error: PropTypes.any,
  info: PropTypes.string,
  shortcut: PropTypes.string,
  value: PropTypes.any
};

export default Input;
