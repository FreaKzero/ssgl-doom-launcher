import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { remote } from 'electron';
import Label from './Label';
import { ButtonStyle } from './Button';
import { InputContainerStyle, InputStyle } from './Input';

const SelectButton = styled(ButtonStyle)`
  min-width: 100px;
  border-radius: 4px 0 0 4px;
  padding: 0;
  &:hover {
    border: none;
  }
`;

const SelectFile = ({
  width = '250px',
  name,
  value,
  label,
  fluid = false,
  onFile,
  directory,
  ...rest
}) => {
  const [file, setFile] = useState('');

  React.useEffect(() => (value ? setFile(value) : setFile('')));

  const onSelect = () => {
    if (!file || file.trim() === '') {
      const openSettings = directory
        ? { properties: ['openDirectory'] }
        : { properties: ['openFile'] };

      remote.dialog.showOpenDialog(openSettings).then(res => {
        setFile(res.filePaths[0]);
        onFile({ name: name, file: res.filePaths[0] });
      });
    } else {
      setFile('');
      onFile({ name: name, file: null });
    }
  };

  return (
    <>
      {label ? <Label>{label}</Label> : null}
      <InputContainerStyle width={width} fluid={fluid}>
        <SelectButton type="button" onClick={onSelect}>
          {file ? 'Reset' : 'Select'}
        </SelectButton>
        <InputStyle name={name} readOnly type="text" value={file} {...rest} />
      </InputContainerStyle>
    </>
  );
};

SelectFile.propTypes = {
  rest: PropTypes.any,
  width: PropTypes.string
};

export default SelectFile;
