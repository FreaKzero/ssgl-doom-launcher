import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { StoreContext } from '#State';
import { Button, Dropdown } from '#Component/Form';
import { useTranslation, setTitle, useIpc, useToast } from '#Util';
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
  const { t } = useTranslation('wads');
  const { gstate, dispatch } = useContext(StoreContext);
  const [form, setForm] = useState(initState);
  const [modalOpen, setModalOpen] = useState(false);
  const [ipc] = useIpc();

  const opts = gstate.packages.map(item => ({
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
            {t('packSaveAs')}
          </Button>
        </>
      )}
    </PackageAreaStyle>
  );
};

export default PackageAreaNew;
