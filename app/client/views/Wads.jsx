import { remote } from 'electron';
import { AnimatePresence } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { useDebounce } from 'use-debounce';

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
  const [poActive, setPoActive] = useState(false);
  const [sort, setSort] = useState('new');
  const [ipc, loading] = useIpc();
  const { t } = useTranslation(['common', 'wads']);
  const [toast] = useToast();

  const [rawFilter, setFilter] = useState('');
  const [filter] = useDebounce(rawFilter, 200);

  const onSelect = id => () => dispatch({ type: 'mod/select', id });

  const onCircle = path => () => remote.shell.showItemInFolder(path);

  const onSort = (index, direction) => () =>
    dispatch({ type: 'mod/move', direction, index });

  const onRefresh = async () => {
    const data = await ipc('main/init');
    dispatch({ type: 'main/init', data: data });
    toast('ok', t('common:success'), t('wads:toastIndex'));
  };

  const onSortList = ({ value }) => setSort(value);

  const onFilterInput = (e, { value }) => {
    if (sort === 'tag') {
      setSort('asc');
    }
    setFilter(value);
  };
  const onTag = tag => () => {
    if (tag === '##BACK##') {
      setFilter('');
    } else {
      setSort('tag');
      setFilter(tag);
    }
  };

  let show = sortList(gstate.mods, sort, filter, (i, fuzz) =>
    fuzz(filter.toLowerCase(), `${i.name.toLowerCase()} ${i.tags.join(' ')}`)
  );

  return (
    <>
      <Flex.Grid>
        <Flex.Col>
          <ModBox
            data={show}
            onClick={onSelect}
            onTag={onTag}
            fixed={
              <ModFilter
                filterValue={rawFilter}
                onInput={onFilterInput}
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
                  gstate.package.selected.map((id, itemindex) => {
                    const item = gstate.mods.find(i => i.id === id);
                    return (
                      <ModItem
                        key={`selected_${item.id}`}
                        item={item}
                        onSelect={onSelect(item.id)}
                        onUp={onSort(itemindex, 'up')}
                        onCircle={onCircle(item.path)}
                        onDown={onSort(itemindex, 'down')}
                        onTag={onTag}
                        selected
                      />
                    );
                  })}
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
