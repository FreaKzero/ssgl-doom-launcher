import React, { useState, useContext } from 'react';
import { StoreContext } from '#State';
import { AnimatePresence } from 'framer-motion';
import fuzz from 'fuzzysearch';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation, setTitle, useIpc, useToast } from '#Util';

import {
  Box,
  ModItem,
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

  const show =
    filter.trim() !== ''
      ? gstate.mods.length &&
        gstate.mods.filter(i =>
          fuzz(filter, `${i.name.toLowerCase()} ${i.lastdir}`)
        )
      : gstate.mods.length && gstate.mods;

  return (
    <>
      <Flex.Grid>
        <Flex.Col>
          <Box
            fixed={
              <ModFilter
                onInput={(e, { value }) => onInput(value)}
                onRefresh={onRefresh}
                refreshLoad={loading}
              />
            }
          >
            <ul>
              <AnimatePresence>
                {show &&
                  show.map(item => (
                    <ModItem
                      key={`mod_${item.id}`}
                      item={item}
                      onSelect={onClick(item.id)}
                    />
                  ))}
              </AnimatePresence>
            </ul>
          </Box>
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
