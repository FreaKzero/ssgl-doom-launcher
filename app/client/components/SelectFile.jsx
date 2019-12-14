import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import { remote } from 'electron';
import { StyledButton } from '#Component/Button';

const SelectButton = styled(StyledButton)`
  min-width: none;
  border-radius: 4px 0 0 4px;
  padding: 0;
  &:hover {
    border: none;
  }
`;

const Label = styled.label`
  display: block;
  margin: 5px 0 5px 0;
  text-transform: uppercase;
`;

const InputStyle = styled.div`
  background-color: ${styles.color.backdrop};
  display: inline-block;
  border-radius: ${styles.border.radius};
  display: flex;
  margin-right: 5px;
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  width: ${p => {
    if (p.fluid) {
      return `100%`;
    }

    if (p.width) {
      return p.width;
    }
  }};
  &:hover {
    border: 1px solid ${styles.border.active};
  }

  &:focus-within {
    border: 1px solid ${styles.border.active};
  }

  & input {
    padding: 7px 7px 7px 10px;
    font-family: ${styles.font.content};
    color: ${styles.color.idle};
    width: 100%;
    font-size: 16px;
    background-color: transparent;
    border: none;
    background-image: none;
    box-shadow: none;
    outline: none;
    margin: 0;
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

  React.useEffect(() => setFile(value));

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
      <InputStyle width={width} fluid={fluid}>
        <SelectButton type="button" onClick={onSelect}>
          {file ? 'Reset' : 'Select'}
        </SelectButton>
        <input name={name} readOnly type="text" value={file} {...rest} />
      </InputStyle>
    </>
  );
};

SelectFile.propTypes = {
  rest: PropTypes.any,
  width: PropTypes.string
};

export default SelectFile;
