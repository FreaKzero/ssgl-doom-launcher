import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import SVG from 'react-svg-inline';
import styled from 'styled-components';

import down from '#/assets/icon/dd.svg';

import { InputContainerStyle, InputStyle } from './Input';
import Label from './Label';

const Wrapper = styled(InputContainerStyle)`
  color: red;
  flex-wrap: wrap;
  position: relative;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.button.idle};
    margin: 11px 10px 0 0;
    transition: all 0.21s ease-out;

    & .down {
      opacity: 0;
    }

    & .up {
      transform: translateY(4px);
    }
  }

  &:hover svg {
    fill: ${({ theme }) => theme.svg.bright};
    filter: ${({ theme }) => theme.svg.glow};
  }

  &:focus-within svg {
    transform: rotate(90deg);

    & .down {
      opacity: 1;
    }

    & .up {
      transform: translateY(0);
    }
  }
`;

const Input = styled(InputStyle)`
  width: calc(100% - 40px);
  color: transparent;
  text-shadow: 0 0 0 white;
  cursor: pointer;

  &:hover {
    text-shadow: 0 0 0 ${({ theme }) => theme.color.active};
  }
`;

const OptionList = styled.ul`
  ${({ theme }) => theme.scrollbar};
  background-color: ${({ theme }) => theme.color.backdrop};
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid ${({ theme }) => theme.border.active};
  position: absolute;
  top: 35px;
  width: 100%;
  overflow: hidden;
  z-index: 100;
  max-height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Option = styled.li`
  transition: ${({ theme }) => theme.transition.out};
  width: 100%;
  padding: 10px 0 10px 10px;
  cursor: pointer;

  &:hover,
  &.focused {
    color: ${({ theme }) => theme.color.active};
    background-color: ${({ theme }) => theme.color.back};
    padding: 10px 0 10px 20px;
  }

  &.selected {
    color: ${({ theme }) => theme.color.active};
  }
`;

const Dropdown = ({
  options,
  onChange,
  width,
  placeholder,
  label,
  value,
  name,
  fluid,
  error = null,
  info = null,
  shortcut = '',
  ...rest
}) => {
  const inputRef = useRef(null);
  const optionRef = useRef(null);
  const selectRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [current, setCurrent] = useState({
    label: '',
    value: ''
  });

  if (shortcut.trim() !== '') {
    useHotkeys(shortcut, () => inputRef.current.focus());
    useHotkeys('escape', () => inputRef.current.blur(), { filter: () => true });
  }

  useEffect(() => {
    if (value && typeof value === 'string' && value.trim() !== '') {
      const selected = options.find(item => item.value === value);
      if (selected && selected.value !== current.value) {
        setCurrent(selected);
      }
    }
  });

  const wat = e => {
    const K = {
      UP: 38,
      DOWN: 40,
      ENTER: 13
    };
    if (open) {
      switch (e.which) {
        case K.UP:
          if (index < 3) {
            optionRef.current.scrollTop = 0;
          }
          return index !== 0 ? setIndex(index - 1) : null;

        case K.DOWN:
          if (index === 4) {
            optionRef.current.scrollTop = optionRef.current.scrollHeight;
          }

          return index < options.length - 1 ? setIndex(index + 1) : null;
        case K.ENTER:
          onSelect(options[index])();
          return e.currentTarget.blur();
      }
    }
  };
  const onFocus = () => {
    setOpen(true);
  };

  const onIcon = () =>
    open ? inputRef.current.blur() : inputRef.current.focus();

  const onBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 250);
  };

  const onSelect = item => () => {
    setCurrent(item);
    onChange({ name, ...item });
  };

  return (
    <>
      {label ? <Label info={info}>{label}</Label> : null}
      {error ? <Label error>{error}</Label> : null}
      <Wrapper width={width} fluid={fluid} error={error}>
        <Input
          ref={inputRef}
          onKeyUp={wat}
          type="text"
          onBlur={onBlur}
          onFocus={onFocus}
          readOnly
          value={current.label}
          placeholder={placeholder}
          {...rest}
        />
        <input
          type="hidden"
          name={name}
          value={current.value}
          ref={selectRef}
        />
        <SVG height={'12px'} svg={down} onClick={onIcon} />
        {open ? (
          <OptionList ref={optionRef}>
            {options.map((item, key) => {
              return (
                <Option
                  key={`${name}_${key}_${item.value}`}
                  onClick={onSelect(item)}
                  className={
                    value === item.value
                      ? 'selected'
                      : index === key
                      ? 'focused'
                      : undefined
                  }
                >
                  {item.label}
                </Option>
              );
            })}
          </OptionList>
        ) : null}
      </Wrapper>
    </>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      fvalue: PropTypes.any
    }).isRequired
  ),
  placeholder: PropTypes.any,
  value: PropTypes.any,
  width: PropTypes.any,
  fluid: PropTypes.bool,
  info: PropTypes.string,
  shortcut: PropTypes.string
};

export default Dropdown;
