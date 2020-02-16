import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '#State';
import Modal from '../Modal';

import { Input, Dropdown, SelectFile } from '#Component/Form';
import Flex from '../Flex';
import covers from '../../assets/covers';
import { useTranslation, setTitle, useIpc, useToast } from '#Util';

const PackageModal = ({
  active,
  setActive,
  setForm,
  form,
  onSubmit,
  onCancel
}) => {
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
      <h1>Save Package</h1>
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

export default PackageModal;
