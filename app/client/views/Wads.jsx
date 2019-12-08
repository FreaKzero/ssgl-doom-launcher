import React, { useState, useEffect } from 'react';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem';
import ModFilter from '#Component/ModFilter';
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
  const { gstate, dispatch } = React.useContext(StoreContext);
  const [filter, setRawFilter] = useState('');

  const onClick = id => e => {
    dispatch({ type: 'select-mod', id });
  };

  const [onInput] = useDebouncedCallback(val => {
    setRawFilter(val.toLowerCase());
  }, 250);

  const show =
    filter.trim() === ''
      ? gstate.mods
      : gstate.mods.filter(i => fuzz(filter, i.name.toLowerCase()));

  return (
    <ViewStyle>
      <Box fixed={<ModFilter onInput={e => onInput(e.target.value)} />}>
        <ul>
          <AnimatePresence>
            {show.map(item => (
              <ModItem key={item.id} item={item} onSelect={onClick(item.id)} />
            ))}
          </AnimatePresence>
        </ul>
      </Box>
      <Box>
        <ul>
          <AnimatePresence>
            {gstate.selected.map(item => (
              <ModItem key={item.id} item={item} onSelect={onClick(item.id)} />
            ))}
          </AnimatePresence>
        </ul>
      </Box>
    </ViewStyle>
  );
};

export default Wads;
