import React, { useState, useEffect } from 'react';
import { T } from '#Util/translation';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem';
import ModFilter from '#Component/ModFilter';
import { StoreContext } from '#State';
import { ipcRenderer } from 'electron';

const Wads = styled(({ ...rest }) => {
  const { gstate, dispatch } = React.useContext(StoreContext);
  const [mods, setMods] = useState([]);
  const [filter, setFilter] = useState('');

  const opts = new Array(30).fill(1).map((d, i) => ({
    label: `label_${i}`,
    value: i
  }));

  const onClick = id => e => {
    dispatch({ type: 'select-mod', id });
  };

  const play = () => {
    ipcRenderer.invoke('play', { selected: gstate.selected });
  };

  const onInput = e => setFilter(e.currentTarget.value);

  useEffect(() => {
    document.title = 'deine mudda';
  }, []);

  const show =
    filter.trim() === ''
      ? gstate.mods
      : gstate.mods.filter(i => !i.name.search(new RegExp(`${filter}`, 'i')));

  return (
    <div {...rest}>
      <Box>
        <ModFilter valueInput={filter} onInput={onInput} />
        {mods
          ? show.map(item => (
              <ModItem key={item.id} item={item} onSelect={onClick(item.id)} />
            ))
          : null}
      </Box>
      <Box>
        {mods
          ? gstate.selected.map(item => (
              <ModItem key={item.id} item={item} onSelect={onClick(item.id)} />
            ))
          : null}
        <button onClick={play}>Play</button>
      </Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
