import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import { Flex } from '#Component';
import { useTranslation } from '#Util';
import {
  Input,
  Checkbox,
  SelectFile,
  Button,
  SubmitArea
} from '#Component/Form';

const FormBorder = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${styles.border.idle};
  border-radius: ${styles.border.radius};
  padding: 10px 10px 0 10px;
  margin-bottom: 15px;
`;

const Form = ({ item, onSave, onDelete }) => {
  const [form, setForm] = React.useState(item);
  const { t } = useTranslation(['sourceports']);

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
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const onSubmitWrapper = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <SelectFile
        onFile={onComponent}
        value={form.binary}
        name="binary"
        label={t('sourceports:binary')}
        fluid
      />
      <Input
        value={form.name}
        name="name"
        label={t('sourceports:name')}
        onChange={onInput}
        fluid
      />

      <Flex.Grid>
        <Flex.Col>
          <FormBorder>
            <Checkbox
              value={form.hasSavedir}
              label={t('sourceports:savegameparam')}
              name="hasSavedir"
              onChange={onComponent}
            />
            {form.hasSavedir ? (
              <Input
                value={form.paramSave}
                name="paramSave"
                onChange={onInput}
                fluid
              />
            ) : null}
          </FormBorder>
        </Flex.Col>
        <Flex.Col>
          <FormBorder>
            <Checkbox
              value={form.hasConfig}
              label={t('sourceports:configparam')}
              name="hasConfig"
              onChange={onComponent}
            />
            {form.hasConfig ? (
              <Input
                value={form.paramConfig}
                name="paramConfig"
                onChange={onInput}
                fluid
              />
            ) : null}
          </FormBorder>
        </Flex.Col>
      </Flex.Grid>
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
    paramScreen: PropTypes.string
  }),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Form;
