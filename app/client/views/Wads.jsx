import React, { useState, useContext } from 'react';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem';
import ModFilter from '#Component/ModFilter';
import PlayOverlay from '#Component/PlayOverlay';
import PlayIcon from '#Component/PlayIcon';
import { StoreContext } from '#State';
import { AnimatePresence } from 'framer-motion';
import fuzz from 'fuzzysearch';
import { useDebouncedCallback } from 'use-debounce';
import setTitle from '#Util/setTitle';

const ViewStyle = styled.div`
  display: flex;
  margin: 15px;
`;

const Wads = () => {
  setTitle('wads');
  const { gstate, dispatch } = useContext(StoreContext);
  const [filter, setRawFilter] = useState('');
  const [poActive, setPoActive] = useState(false);

  const onClick = id => e => {
    dispatch({ type: 'mod/select', id });
  };

  const onSort = (index, direction) => e => {
    dispatch({ type: 'mod/move', direction, index });
  };

  const [onInput] = useDebouncedCallback(val => {
    setRawFilter(val.toLowerCase());
  }, 250);

  const show =
    filter.trim() !== ''
      ? gstate.mods.length &&
        gstate.mods.filter(i =>
          fuzz(filter, `${i.name.toLowerCase()} ${i.lastdir}`)
        )
      : gstate.mods.length && gstate.mods;

  return (
    <ViewStyle>
      <Box fixed={<ModFilter onInput={(e, { value }) => onInput(value)} />}>
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
      <PlayIcon
        active={gstate.selected.length}
        onClick={() => setPoActive(true)}
      />
      <PlayOverlay active={poActive} setActive={setPoActive} />
    </ViewStyle>
  );
};

export default Wads;
