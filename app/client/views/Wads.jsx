import React, { useState, useContext } from 'react';
import { StoreContext } from '#State';
import { AnimatePresence } from 'framer-motion';
import fuzz from 'fuzzysearch';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation, setTitle, useIpc, useToast } from '#Util';
import PackageAreaNew from '../components/PackageAreaNew';
import { remote } from 'electron';

import {
  Box,
  ModItem,
  ModBox,
  ModFilter,
  PlayOverlay,
  PlayIcon,
  Flex
} from '#Component';
import { Button } from '#Component/Form';

const Wads = () => {
  setTitle('wads');
  const { gstate, dispatch } = useContext(StoreContext);
  const [filter, setRawFilter] = useState('');
  const [poActive, setPoActive] = useState(false);
  const [sort, setSort] = useState('new');
  const [fetch, loading] = useIpc();
  const { t } = useTranslation(['common', 'wads']);
  const [toast] = useToast();

  const onSelect = id => e => {
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

  const onSortList = ({ value }) => {
    setSort(value);
  };

  const buildShowList = () => {
    const srt = () => {
      switch (sort) {
        case 'asc':
          return gstate.mods.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
          });
        case 'desc':
          return gstate.mods.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0;
          });
        case 'new':
          return gstate.mods.sort((a, b) => b.date - a.date);
        case 'old':
          return gstate.mods.sort((a, b) => a.date - b.date);
        case 'active':
          return gstate.mods.sort((a, b) => b.active - a.active);
        default:
          return gstate.mods;
      }
    };

    if (gstate.mods.length) {
      let show = srt();
      return filter.trim() !== ''
        ? show
            .filter(i => fuzz(filter, `${i.name.toLowerCase()} ${i.lastdir}`))
            .sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            })
        : show;
    }

    return [];
  };

  let show = buildShowList();

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
      <PlayIcon
        active={gstate.package.selected.length}
        onClick={() => setPoActive(true)}
      />
      <PlayOverlay active={poActive} setActive={setPoActive} />
    </>
  );
};

export default Wads;
