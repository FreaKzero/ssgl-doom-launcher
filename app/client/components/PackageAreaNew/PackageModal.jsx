import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { StoreContext } from '../../state';
import { useTranslation } from '../../utils';
import Flex from '../Flex';
import { Button, Dropdown, Input, SelectFile } from '../Form';
import Modal from '../Modal';

const PackageModal = ({
  active,
  toggle,
  setForm,
  form,
  onSubmit,
  onCancel,
  edit = false
}) => {
  const { t } = useTranslation(['common', 'packages']);
  const { gstate } = useContext(StoreContext);

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

  const title = edit
    ? t('packages:titleEdit', { name: form.name })
    : t('packages:titleSave', { name: form.name });

  return (
    <Modal active={active} toggle={toggle} title={title} strict>
      <form onSubmit={onSubmit}>
        <Flex.Grid>
          <Flex.Col>
            <Input
              name="name"
              label={t('packages:packageName')}
              fluid
              onChange={onInput}
              value={form.name}
            />
          </Flex.Col>
          <Flex.Col>
            <SelectFile
              name="cover"
              onFile={onComponent}
              label={t('packages:cover')}
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
              label={t('common:iwad')}
              onChange={onComponent}
            />
          </Flex.Col>
          <Flex.Col>
            <Dropdown
              options={sourceportOptions}
              value={form.sourceport}
              name="sourceport"
              label={t('common:sourceport')}
              onChange={onComponent}
            />
          </Flex.Col>
        </Flex.Grid>
        <Input
          name="userparams"
          label={t('packages:userParams')}
          onChange={onInput}
          value={form.userparams}
          fluid
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            type="button"
            border={'#f55945'}
            glow={'#b8342a'}
            color={'#ff2f00'}
            onClick={onCancel}
            width="100px"
          >
            {t('cancel')}
          </Button>
          <Button type="submit" style={{ margin: 0 }} width="100px">
            {t('ok')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

PackageModal.propTypes = {
  active: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  form: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  edit: PropTypes.bool
};

export default PackageModal;
