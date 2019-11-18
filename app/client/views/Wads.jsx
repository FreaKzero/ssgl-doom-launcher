import React, { useState, useEffect } from 'react';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem';
import ModFilter from '#Component/ModFilter';
import { StoreContext } from '#State';
import { ipcRenderer } from 'electron';
import { AnimatePresence } from 'framer-motion';
import fuzz from 'fuzzysearch';

const Wads = styled(({ ...rest }) => {
  const { gstate, dispatch } = React.useContext(StoreContext);
  const [filter, setFilter] = useState('');

  const onClick = id => e => {
    dispatch({ type: 'select-mod', id });
  };

  const play = () => ipcRenderer.invoke('play', { selected: gstate.selected });

  const onInput = e => setFilter(e.currentTarget.value.toLowerCase());

  useEffect(() => {
    document.title = 'SSGL';
  }, []);

  const show =
    filter.trim() === '' && filter.length > 2
      ? gstate.mods
      : gstate.mods.filter(i => fuzz(filter, i.name.toLowerCase()));

  return (
    <div {...rest}>
      <Box fixed={<ModFilter valueInput={filter} onInput={onInput} />}>
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
        <button onClick={play}>Play</button>
      </Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
