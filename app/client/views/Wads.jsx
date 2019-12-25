import React, { useState, useContext } from 'react';
import { StoreContext } from '#State';
import { AnimatePresence } from 'framer-motion';
import fuzz from 'fuzzysearch';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation, setTitle, useIpc, useToast } from '#Util';

import {
  Box,
  ModItem,
  ModBox,
  ModFilter,
  PlayOverlay,
  PlayIcon,
  Flex
} from '#Component';

const Wads = () => {
  setTitle('wads');
  const { gstate, dispatch } = useContext(StoreContext);
  const [filter, setRawFilter] = useState('');
  const [poActive, setPoActive] = useState(false);
  const [sort, setSort] = useState('new');
  const [fetch, loading] = useIpc();
  const { t } = useTranslation(['common', 'wads']);
  const [toast] = useToast();

  const onClick = id => () => {
    dispatch({ type: 'mod/select', id });
  };

  const onSort = (index, direction) => () => {
    dispatch({ type: 'mod/move', direction, index });
  };

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
            onClick={onClick}
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
          <Box>
            <ul>
              <AnimatePresence>
                {gstate.selected.length &&
                  gstate.selected.map((item, itemindex) => (
                    <ModItem
                      key={`selected_${item.id}`}
                      item={item}
                      onSelect={onClick(item.id)}
                      onUp={onSort(itemindex, 'up')}
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
        active={gstate.selected.length}
        onClick={() => setPoActive(true)}
      />
      <PlayOverlay active={poActive} setActive={setPoActive} />
    </>
  );
};

export default Wads;
