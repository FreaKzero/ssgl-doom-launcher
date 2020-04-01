import { remote } from 'electron';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useTranslation } from '../../utils';
import { ButtonStyle } from './Button';
import { InputContainerStyle, InputStyle } from './Input';
import Label from './Label';

const Input = styled(InputStyle)`
  cursor: default;
`;

const SelectButton = styled(ButtonStyle)`
  user-select: none;
  min-width: 150px;
  border-radius: ${({ theme }) =>
    `${theme.border.radius} 0 0 ${theme.border.radius}`};
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
  error = null,
  info = null,
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
      {label ? <Label info={info}>{label}</Label> : null}
      {error ? <Label error>{error}</Label> : null}
      <InputContainerStyle width={width} fluid={fluid} error={error}>
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
  width: PropTypes.string,
  error: PropTypes.any,
  info: PropTypes.string
};

export default SelectFile;
