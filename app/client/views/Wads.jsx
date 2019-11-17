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

  useEffect(() => {
    document.title = 'deine mudda';
  }, []);

  return (
    <div {...rest}>
      <Box>
        <ModFilter />
        {mods
          ? gstate.mods.map(item => (
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
