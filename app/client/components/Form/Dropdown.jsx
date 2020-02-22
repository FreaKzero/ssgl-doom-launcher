import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import down from '#Asset/icon/down.svg';
import { InputContainerStyle, InputStyle } from './Input';
import styles from '#Style';
import SVG from 'react-svg-inline';
import Label from './Label';

const Wrapper = styled(InputContainerStyle)`
  color: red;
  flex-wrap: wrap;
  position: relative;

  svg {
    stroke: ${styles.button.idle};
    margin: 11px 10px 0 0;
    transition: all 0.21s ease-out;
  }

  &:hover svg {
    stroke: ${styles.svg.yellow};
    filter: ${styles.svg.glow};
  }

  &:focus-within svg {
    transform: rotate(180deg);
  }
`;

const Input = styled(InputStyle)`
  width: calc(100% - 40px);
  color: transparent;
  text-shadow: 0 0 0 white;
  cursor: pointer;

  &:hover {
    text-shadow: 0 0 0 ${styles.color.active};
  }
`;

const OptionList = styled.ul`
  background-color: ${styles.color.backdrop};
  border-radius: ${styles.border.radius};
  border: 1px solid ${styles.border.active};
  position: absolute;
  top: 35px;
  width: 100%;
  overflow: hidden;
  z-index: 999;
`;

const Option = styled.li`
  transition: ${styles.transition.out};
  width: 100%;
  padding: 10px 0 10px 10px;
  cursor: pointer;

  &:hover {
    color: ${styles.color.active};
    background-color: ${styles.color.back};
    padding: 10px 0 10px 20px;
  }

  &.selected {
    color: ${styles.color.active};
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
  ...rest
}) => {
  const selectRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({
    label: '',
    value: ''
  });

  useEffect(() => {
    if (value && typeof value === 'string' && value.trim() !== '') {
      const selected = options.find(item => item.value === value);
      if (selected && selected.value !== current.value) {
        setCurrent(selected);
      }
    }
  });

  const onFocus = () => setOpen(true);

  const onBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  const onSelect = item => () => {
    setCurrent(item);
    onChange({ name, ...item });
  };

  return (
    <>
      {label ? <Label>{label}</Label> : null}
      <Wrapper width={width} fluid={fluid}>
        <Input
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
        <SVG height={'12px'} svg={down} />
        {open ? (
          <OptionList>
            {options.map((item, key) => {
              return (
                <Option
                  key={`${name}_${key}_${item.value}`}
                  onClick={onSelect(item)}
                  className={value === item.value ? 'selected' : undefined}
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
  fluid: PropTypes.bool
};

export default Dropdown;
