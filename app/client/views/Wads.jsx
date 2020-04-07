import { remote } from 'electron';
import { AnimatePresence } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  Box,
  Flex,
  ModBox,
  ModFilter,
  ModItem,
  PackageAreaNew,
  PlayIcon,
  PlayOverlay
} from '../components';
import { StoreContext } from '../state';
import { setTitle, sortList, useIpc, useToast, useTranslation } from '../utils';

const Wads = () => {
  setTitle('wads');
  const { gstate, dispatch } = useContext(StoreContext);
  const [filter, setRawFilter] = useState('');
  const [poActive, setPoActive] = useState(false);
  const [sort, setSort] = useState('new');
  const [fetch, loading] = useIpc();
  const { t } = useTranslation(['common', 'wads']);
  const [toast] = useToast();

  const onSelect = id => () => {
    dispatch({ type: 'mod/select', id });
  };

  const onSort = (index, direction) => () => {
    dispatch({ type: 'mod/move', direction, index });
  };

  const onCircle = path => () => remote.shell.showItemInFolder(path);

  const [onInput] = useDebouncedCallback(val => {
    setRawFilter(val.toLowerCase());
  }, 200);

  const onRefresh = async () => {
    const data = await fetch('main/init');
    dispatch({ type: 'main/init', data: data });
    toast('ok', t('common:success'), t('wads:toastIndex'));
  };

  const onSortList = ({ value }) => setSort(value);

  let show = sortList(gstate.mods, sort, filter, (i, fuzz) =>
    fuzz(filter, `${i.name.toLowerCase()} ${i.lastdir.toLowerCase()}`)
  );
  return (
    <>
      <Flex.Grid>
        <Flex.Col>
          <ModBox
            data={show}
            onClick={onSelect}
            fixed={
              <ModFilter
                onInput={(e, { value }) => onInput(value)}
                onRefresh={onRefresh}
                refreshLoad={loading}
                onSort={onSortList}
                sortValue={sort}
                size={show.length}
              />
            }
          ></ModBox>
        </Flex.Col>
        <Flex.Col>
          <Box fixed={<PackageAreaNew />}>
            <ul>
              <AnimatePresence>
                {gstate.package.selected.length &&
                  gstate.package.selected.map((item, itemindex) => (
                    <ModItem
                      key={`selected_${item.id}`}
                      item={item}
                      onSelect={onSelect(item.id)}
                      onUp={onSort(itemindex, 'up')}
                      onCircle={onCircle(item.path)}
                      onDown={onSort(itemindex, 'down')}
                      selected
                    />
                  ))}
              </AnimatePresence>
            </ul>
          </Box>
        </Flex.Col>
      </Flex.Grid>
      <PlayIcon active={true} onClick={() => setPoActive(true)} />
      <PlayOverlay active={poActive} setActive={setPoActive} />
    </>
  );
};

export default Wads;
