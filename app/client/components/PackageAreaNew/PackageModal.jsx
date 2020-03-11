import PropTypes from 'prop-types';
import React, { useContext, useRef } from 'react';

import { StoreContext } from '../../state';
import { useTranslation } from '../../utils';
import Flex from '../Flex';
import { Dropdown, Input, SelectFile } from '../Form';
import Modal from '../Modal';

const PackageModal = ({
  active,
  setActive,
  setForm,
  form,
  onSubmit,
  onCancel,
  edit = false
}) => {
  const { t } = useTranslation('packages');
  const { gstate } = useContext(StoreContext);
  const formRef = useRef(null);

  const iwadOptions = gstate.iwads.map(item => {
    return {
      label: item.name,
      value: item.path
    };
  });

  const sourceportOptions = gstate.sourceports.map(item => {
    return {
      label: item.name,
      value: item.id
    };
  });

  const onSave = () => formRef.current.dispatchEvent(new Event('submit'));

  const onComponent = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value ? value : ''
    });
  };

  const onInput = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <Modal
      active={active}
      setActive={setActive}
      onOk={onSave}
      onCancel={onCancel}
    >
      <h1>
        {edit
          ? t('titleEdit', { name: form.name })
          : t('titleSave', { name: form.name })}
      </h1>
      <form onSubmit={onSubmit} ref={formRef}>
        <Flex.Grid>
          <Flex.Col>
            <Input
              name="name"
              label="Package Name"
              fluid
              onChange={onInput}
              value={form.name}
            />
          </Flex.Col>
          <Flex.Col>
            <SelectFile
              name="cover"
              onFile={onComponent}
              label={'cover'}
              value={form.cover}
              fluid
            />
          </Flex.Col>
        </Flex.Grid>
        <Flex.Grid>
          <Flex.Col>
            <Dropdown
              options={iwadOptions}
              name="iwad"
              value={form.iwad}
              label="iwad"
              onChange={onComponent}
            />
          </Flex.Col>
          <Flex.Col>
            <Dropdown
              options={sourceportOptions}
              value={form.sourceport}
              name="sourceport"
              label="sourceport"
              onChange={onComponent}
            />
          </Flex.Col>
        </Flex.Grid>
      </form>
    </Modal>
  );
};

PackageModal.propTypes = {
  active: PropTypes.bool,
  edit: PropTypes.bool,
  form: PropTypes.any,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
};

export default PackageModal;
