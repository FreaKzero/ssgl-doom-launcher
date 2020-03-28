import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import discSvg from '../../assets/icon/disc.svg';
import editSvg from '../../assets/icon/edit.svg';
import trashSvg from '../../assets/icon/trash.svg';
import { StoreContext } from '../../state';
import { useIpc, useToast, useTranslation } from '../../utils';
import { Dropdown, IconButton } from '../Form';
import { createPackage, initState } from './helper';
import PackageModal from './PackageModal';

const NULLCONST = '#NULL';

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
  const [copy, setCopy] = useState(null);

  const opts = [{ name: 'No Package', id: NULLCONST }, ...gstate.packages].map(
    item => ({
      label: item.name,
      value: item.id
    })
  );

  useEffect(() => {
    if (gstate.package.id === null) {
      setForm({
        ...gstate.package
      });
    } else if (form.id !== gstate.package.id) {
      setForm({
        ...gstate.package,
        iwad: gstate.package.iwad,
        sourceport: gstate.package.sourceport,
        cover: gstate.package.cover.isFile ? gstate.package.cover.use : ''
      });
    }
  }, [gstate]);

  const onSelect = ({ value }) => {
    if (value === NULLCONST) {
      dispatch({ type: 'packages/reset' });
    } else {
      dispatch({ type: 'packages/select', id: value });
    }
  };

  const onReset = () => {
    dispatch({ type: 'packages/reset' });
    setForm(initState);
  };

  const onSaveAs = () => {
    setCopy(form.id);
    setModalOpen(true);
  };

  const onModalCancel = () => {
    setCopy(null);
    setModalOpen(false);
  };

  const onModalSubmit = async e => {
    e.preventDefault();
    const pack = createPackage(form, gstate, copy);
    try {
      const data = await ipc('packages/save', pack);
      dispatch({
        type: 'packages/save',
        packages: data.packages,
        package: data.package
      });
      setModalOpen(false);
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      toast('ok', t('common:success'), t('packages:toastSave'));
    }, 300);
  };

  return (
    <PackageAreaStyle>
      <PackageModal
        onCancel={onModalCancel}
        onSubmit={onModalSubmit}
        setForm={setForm}
        form={form}
        active={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        edit={copy === null && form.id !== null}
      />

      {gstate.package.id !== null ? (
        <IconButton svg={editSvg} onClick={() => setModalOpen(true)} />
      ) : null}

      <Dropdown
        options={opts}
        onChange={onSelect}
        placeholder={t('packages:selectPackage')}
        name="packageSelector"
        value={gstate.package.id || NULLCONST}
        fluid
      />
      {gstate.package.selected.length > 0 ? (
        <IconButton svg={discSvg} onClick={onSaveAs} />
      ) : null}
      {gstate.package.selected.length > 0 || gstate.package.id ? (
        <IconButton svg={trashSvg} onClick={onReset} />
      ) : null}
    </PackageAreaStyle>
  );
};

export default PackageAreaNew;
