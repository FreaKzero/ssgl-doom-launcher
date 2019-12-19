import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { remote } from 'electron';
import Label from './Label';
import { ButtonStyle } from './Button';
import { InputContainerStyle, InputStyle } from './Input';
import { useTranslation } from '#Util/translation';

const Input = styled(InputStyle)`
  cursor: default;
`;

const SelectButton = styled(ButtonStyle)`
  user-select: none;
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
  const { t } = useTranslation('atoms');

  useEffect(() => setFile(value), [value]);
  const onSelect = () => {
    if (!file || file.trim() === '') {
      const openSettings = directory
        ? { properties: ['openDirectory'] }
        : { properties: ['openFile'] };

      remote.dialog.showOpenDialog(openSettings).then(res => {
        setFile(res.filePaths[0]);
        onFile({ name: name, value: res.filePaths[0] });
      });
    } else {
      setFile('');
      onFile({ name: name, value: null });
    }
  };

  return (
    <>
      {label ? <Label>{label}</Label> : null}
      <InputContainerStyle width={width} fluid={fluid}>
        <SelectButton type="button" onClick={onSelect}>
          {file ? t('reset') : directory ? t('selectDir') : t('selectFile')}
        </SelectButton>
        <Input name={name} readOnly type="text" value={file} {...rest} />
      </InputContainerStyle>
    </>
  );
};

SelectFile.propTypes = {
  directory: PropTypes.bool,
  fluid: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onFile: PropTypes.func.isRequired,
  value: PropTypes.string,
  width: PropTypes.string
};

export default SelectFile;
