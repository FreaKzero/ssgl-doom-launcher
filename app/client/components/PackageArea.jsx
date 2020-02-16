import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Dropdown } from '#Component/Form';
import { StoreContext } from '#State';
import PackageModal from './PackageModal';
import uuid from 'uuid-quick';
import { useTranslation, useIpc } from '#Util';

// TODO: pack this into reducer...
const createPackages = (form, state) => {
  const useSourceport = state.sourceports.find(i => i.id === form.sourceport);

  const useIwad = state.iwads.find(i => i.path === form.iwad);

  const cover =
    form.cover && form.cover.trim() !== ''
      ? {
          isFile: true,
          use:
            form.cover.substring(0, 7) === 'file://'
              ? form.cover
              : `file://${form.cover}`
        }
      : { isFile: false, use: useIwad.name.toLowerCase() };

  const x = {
    id: form.id ? form.id : uuid(),
    name: form.name,
    iwad: form.iwad,
    sourceport: useSourceport,
    selected: state.selected,
    cover: cover
  };

  const newPackages =
    form.id === null
      ? [x, ...state.packages]
      : state.packages.map(item => (item.id === form.id ? x : item));

  return newPackages;
};

const initState = {
  name: '',
  iwad: '',
  sourceport: '',
  cover: '',
  id: null
};

const PackageAreaStyle = styled.div`
  margin-bottom: 5px;
  display: flex;

  & > button {
    height: 37px;
  }
`;

const PackageArea = () => {
  const { t } = useTranslation('wads');
  const { gstate, dispatch } = useContext(StoreContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initState);
  const [fetch] = useIpc();

  const opts = gstate.packages.map(item => ({
    label: item.name,
    value: item.id
  }));

  useEffect(() => {
    if (form.id !== gstate.package.id) {
      setForm({
        ...gstate.package,
        sourceport: gstate.package.sourceport.id,
        iwad: gstate.package.iwad,
        cover: gstate.package.cover.isFile ? gstate.package.cover.use : ''
      });
    }
  }, [gstate]);

  const onSelect = ({ value }) =>
    dispatch({ type: 'packages/select', id: value });

  const onSaveAs = () => {
    setForm({
      ...form,
      id: null
    });

    setTimeout(() => setModalOpen(true), 100);
  };

  const onReset = () => {
    dispatch({ type: 'packages/reset' });
    setForm(initState);
  };

  const onAdd = () => {
    setModalOpen(true);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const packs = createPackages(form, gstate);
    await fetch('packages/save', packs);
    dispatch({ type: 'packages/save', data: packs });
  };

  return (
    <PackageAreaStyle>
      <PackageModal
        onCancel={() => null}
        onSubmit={onSubmit}
        setForm={setForm}
        form={form}
        active={modalOpen}
        setActive={() => setModalOpen(!modalOpen)}
      />
      {form.name.trim() === '' && opts.length > 0 ? (
        <Dropdown
          options={opts}
          width="200px"
          onChange={onSelect}
          placeholder={'Select Package'}
          fluid
        />
      ) : null}
      {/* TODO: use ID */}
      {form.name.trim() !== '' ? (
        <>
          <Button onClick={onAdd} fluid>
            {t('packEdit')}
          </Button>
          <Button onClick={onSaveAs} fluid>
            {t('packSaveAs')}
          </Button>
          <Button onClick={onReset} fluid>
            {t('packReset')}
          </Button>
        </>
      ) : (
        <Button onClick={onAdd} fluid>
          {t('packSaveAs')}
        </Button>
      )}
    </PackageAreaStyle>
  );
};

PackageArea.propTypes = {
  onInput: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshLoad: PropTypes.bool.isRequired,
  valueInput: PropTypes.string
};

export default PackageArea;
