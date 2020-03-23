import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import styles from '#Style';

import {
  Button,
  Checkbox,
  Input,
  SelectFile,
  SubmitArea
} from '../../components/Form';
import { useToast, useTranslation } from '../../utils';

const FormBorder = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${styles.border.idle};
  border-radius: ${styles.border.radius};
  padding: 10px 10px 0 10px;
  margin-bottom: 15px;
`;

const Form = ({ item, onSave, onDelete }) => {
  const [form, setForm] = useState(item);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation(['sourceports', 'common']);
  const [toast] = useToast();

  useEffect(() => {
    setForm(item);
  }, [item]);

  const onInput = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onComponent = ({ name, value }) => {
    if (typeof value === 'undefined') {
      value = '';
    }

    if (name === 'binary' && value) {
      const namevalue = value
        .split('\\')
        .pop()
        .split('/')
        .pop()
        .split('.')[0];

      setForm({
        ...form,
        [name]: value,
        name: namevalue
      });
    } else if (name === 'configDefault' && value) {
      const configFilename = value
        .split('\\')
        .pop()
        .split('/')
        .pop();

      setForm({
        ...form,
        [name]: value,
        configFilename
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const validate = () => {
    let tmp = {};
    let hasError = false;

    if (form.binary.trim() === '') {
      tmp.binary = 'Required';
    }

    if (form.name.trim() === '') {
      tmp.name = 'Required';
    }

    if (form.hasConfig === true) {
      if (form.paramConfig[0] !== '-') {
        tmp.paramConfig = 'Parameters must start with -';
      }
      if (form.configFilename.trim() === '') {
        tmp.configFilename = 'Required';
      }
    }

    if (form.hasSavedir === true && form.paramSave[0] !== '-') {
      tmp.paramSave = 'Parameters must start with -';
    }

    if (form.hasSavedir === true && form.paramLoad[0] !== '-') {
      tmp.paramLoad = 'Parameters must start with -';
    }

    if (Object.keys(tmp).length > 0) {
      hasError = true;
    }

    setErrors(tmp);

    return hasError;
  };

  const onSubmitWrapper = e => {
    e.preventDefault();
    const hasError = validate();
    if (!hasError) {
      onSave(form);
    } else {
      toast('danger', t('common:error'), t('common:toastRequired'));
    }
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <SelectFile
        onFile={onComponent}
        value={form.binary}
        name="binary"
        label={t('sourceports:binary')}
        error={errors.binary}
        fluid
      />
      <Input
        value={form.name}
        name="name"
        label={t('sourceports:name')}
        onChange={onInput}
        error={errors.name}
        fluid
      />

      <FormBorder>
        <Checkbox
          value={form.hasConfig}
          label={t('sourceports:configparam')}
          name="hasConfig"
          onChange={onComponent}
        />
        {form.hasConfig ? (
          <>
            <Input
              value={form.paramConfig}
              name="paramConfig"
              label={t('sourceports:parameter')}
              onChange={onInput}
              error={errors.paramConfig}
              fluid
            />
            <Input
              value={form.configFilename}
              name="configFilename"
              label={t('sourceports:filename')}
              onChange={onInput}
              error={errors.configFilename}
              fluid
            />
            <SelectFile
              onFile={onComponent}
              value={form.configDefault}
              name="configDefault"
              label={t('sourceports:configDefault')}
              fluid
            />
          </>
        ) : null}
      </FormBorder>
      <FormBorder>
        <Checkbox
          value={form.hasSavedir}
          label={t('sourceports:savegameparam')}
          name="hasSavedir"
          onChange={onComponent}
        />
        {form.hasSavedir ? (
          <>
            <Input
              value={form.paramSave}
              name="paramSave"
              label={t('sourceports:paramSave')}
              onChange={onInput}
              error={errors.paramSave}
              fluid
            />
            <Input
              value={form.paramLoad}
              name="paramLoad"
              label={t('sourceports:paramLoad')}
              onChange={onInput}
              error={errors.paramLoad}
              fluid
            />
          </>
        ) : null}
      </FormBorder>
      <SubmitArea>
        <Button
          border={'#f55945'}
          glow={'#b8342a'}
          color={'#ff2f00'}
          onClick={onDelete(item.id)}
        >
          {t('delete')}
        </Button>
        <Button type="submit" width="200px">
          {t('sourceports:save')}
        </Button>
      </SubmitArea>
    </form>
  );
};

Form.propTypes = {
  item: PropTypes.shape({
    binary: PropTypes.string,
    hasConfig: PropTypes.bool,
    hasSavedir: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    paramConfig: PropTypes.string,
    paramSave: PropTypes.string,
    paramLoad: PropTypes.string
  }),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Form;
