import { AnimatePresence } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Box } from '../../components';
import Confirm from '../../components/Confirm';
import { StoreContext } from '../../state';
import {
  sortList,
  useHashLocation,
  useIpc,
  useToast,
  useTranslation
} from '../../utils';
import ObligeModal from './ObligeModal';
import Pack from './Pack';
import PackageFilter from './PackageFilter';

const Packages = () => {
  const { gstate, dispatch } = useContext(StoreContext);
  const [filter, setRawFilter] = useState('');
  const [sort, setSort] = useState('last');
  const [ipc] = useIpc();
  const onSort = ({ value }) => setSort(value);
  const [confirm, setConfirm] = useState({ id: null, open: false });
  const { t } = useTranslation(['common']);
  const [toast] = useToast();
  // eslint-disable-next-line no-unused-vars
  const [location, navigate] = useHashLocation();
  const [selectedPack, setSelectedPack] = useState(null);

  const [onInput] = useDebouncedCallback(val => {
    setRawFilter(val.toLowerCase());
  }, 300);

  let show = sortList(gstate.packages, sort, filter, (i, fuzz) =>
    fuzz(filter, i.name.toLowerCase())
  );

  const onDelete = id => () => {
    setConfirm({
      open: true,
      id: id
    });
  };

  const onOk = async () => {
    if (!confirm.id) {
      return;
    }

    const newPackages = await ipc('packages/delete', confirm.id);
    dispatch({ type: 'packages/delete', packages: newPackages });
    setConfirm({
      open: false,
      id: null
    });
  };

  const onCancel = () => {
    setConfirm({
      open: false,
      id: null
    });
  };

  const onPlay = (pack, sourceport) => async () => {
    const newPackages = await ipc('packages/play', {
      pack: pack,
      load: true,
      oblige: null
    });

    dispatch({ type: 'packages/save', packages: newPackages, package: null });

    toast(
      'ok',
      t('common:toastStart'),
      t('common:toastStartText', {
        sourceport: sourceport.name,
        num: newPackages.length
      })
    );
  };

  const onData = path => () => ipc('packages/open', { path: path });

  const onUse = id => () => {
    dispatch({ type: 'packages/select', id: id });
    navigate('/');
  };

  return (
    <Box
      fixed={
        <PackageFilter
          sortValue={sort}
          onSort={onSort}
          size={show.length}
          onInput={(e, { value }) => onInput(value)}
        />
      }
    >
      <AnimatePresence>
        {show.map(pack => (
          <Pack
            pack={pack}
            key={pack.id}
            onDelete={onDelete}
            onUse={onUse}
            onData={onData}
            onPlay={onPlay}
            onOblige={() => setSelectedPack(pack)}
          />
        ))}
      </AnimatePresence>
      <Confirm active={confirm.open} onOk={onOk} onCancel={onCancel} />
      {gstate.settings.obligeActive ? (
        <ObligeModal
          active={selectedPack}
          toggle={setSelectedPack}
          pack={selectedPack}
        />
      ) : null}
    </Box>
  );
};
export default Packages;
