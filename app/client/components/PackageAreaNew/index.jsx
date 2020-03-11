import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { StoreContext } from '#State';
import { Button, Dropdown } from '#Component/Form';
import { useTranslation, useIpc, useToast } from '#Util';
import PackageModal from './PackageModal';
import { initState, createPackages } from './helper';

const PackageAreaStyle = styled.div`
  display: flex;

  & > button {
    height: 37px;
    margin-bottom: 15px;
  }
`;

const PackageAreaNew = () => {
  const { t } = useTranslation(['wads', 'common', 'packages']);
  const { gstate, dispatch } = useContext(StoreContext);
  const [form, setForm] = useState(initState);
  const [modalOpen, setModalOpen] = useState(false);
  const [ipc] = useIpc();
  const [toast] = useToast();

  const opts = gstate.packages
    .sort((a, b) => b.lastplayed - a.lastplayed)
    .map(item => ({
      label: item.name,
      value: item.id
    }));

  useEffect(() => {
    if (form.id !== gstate.package.id) {
      setForm({
        ...gstate.package,
        iwad: gstate.package.iwad.path,
        sourceport: gstate.package.sourceport.id,
        cover: gstate.package.cover.isFile ? gstate.package.cover.use : ''
      });
    }
  }, [gstate]);

  const onSelect = ({ value }) =>
    dispatch({ type: 'packages/select', id: value });

  const onReset = () => {
    dispatch({ type: 'packages/reset' });
    setForm(initState);
  };

  const onSaveAs = () => {
    setForm({
      ...form,
      id: null
    });

    setTimeout(() => setModalOpen(true), 100);
  };

  const onModalSubmit = async e => {
    e.preventDefault();
    const { packages, pack } = createPackages(form, gstate);
    await ipc('packages/save', packages);
    dispatch({ type: 'packages/save', packages: packages, package: pack });
    toast('ok', t('common:success'), t('packages:toastSave'));
  };

  return (
    <PackageAreaStyle>
      <PackageModal
        onCancel={() => null}
        onSubmit={onModalSubmit}
        setForm={setForm}
        form={form}
        active={modalOpen}
        setActive={() => setModalOpen(!modalOpen)}
        edit={form.id !== null}
      />
      {form.id !== null ? (
        <>
          <Button onClick={() => setModalOpen(true)} fluid>
            {t('wads:packEdit')}
          </Button>
          <Button onClick={onSaveAs} fluid>
            {t('wads:packSaveAs')}
          </Button>
          <Button onClick={onReset} fluid>
            {t('wads:packReset')}
          </Button>
        </>
      ) : (
        <>
          {opts.length > 0 ? (
            <Dropdown
              options={opts}
              onChange={onSelect}
              placeholder={'Select Package'}
              fluid
            />
          ) : null}
          <Button onClick={() => setModalOpen(true)} fluid>
            {t('wads:packSaveAs')}
          </Button>
        </>
      )}
    </PackageAreaStyle>
  );
};

export default PackageAreaNew;
