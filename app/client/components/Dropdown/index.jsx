import React, { useState } from 'react';
import style from '#Style';
import { OptionItem, Options, Selected, DropdownStyle } from './styles';
import Caret from './Caret';

const Dropdown = ({ options, onChange, width, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  const onSelectWrap = item => e => {
    e.preventDefault();
    setCurrent(item.label);
    onChange(e, item);
  };

  const onBlur = () =>
    setTimeout(() => {
      setOpen(false);
    }, 100);

  const onFocus = () => setOpen(true);

  return (
    <DropdownStyle width={width}>
      <div className={open ? 'open container' : 'container'}>
        <Selected>
          <input
            placeholder={placeholder}
            type="text"
            value={current}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly
          />
          <Caret />
        </Selected>

        <Options width={width}>
          {options.map(item => (
            <OptionItem
              key={item.key || item.label}
              onClick={onSelectWrap(item)}
            >
              {item.label}
            </OptionItem>
          ))}
        </Options>
      </div>
    </DropdownStyle>
  );
};

export default Dropdown;
