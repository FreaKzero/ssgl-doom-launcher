import React, { useState, useEffect } from 'react';
import { T } from '#Util/translation';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem';
import Dropdown from '#Component/Dropdown';
import { StoreContext } from '#State';
import { ipcRenderer } from 'electron';

const Wads = styled(({ ...rest }) => {
  const [mods, setMods] = useState([]);

  const opts = new Array(30).fill(1).map((d, i) => ({
    label: `label_${i}`,
    value: i
  }));

  const onClick = id => e => {
    setMods(mods.map(i => (i.id === id ? { ...i, active: !i.active } : i)));
  };

  useEffect(() => {
    ipcRenderer.invoke('modlist', null).then(data => {
      setMods(data.data);
    });
  }, [ipcRenderer]);

  return (
    <div {...rest}>
      <Box>
        {mods
          ? mods.map(item => (
              <ModItem item={item} onSelect={onClick(item.id)} />
            ))
          : null}
      </Box>
      <Box>
        <Dropdown
          placeholder="Please Choose"
          onChange={() => true}
          width="200px"
          options={opts}
          value={''}
        />
        <Dropdown
          placeholder="Please Choose"
          onChange={() => true}
          width="200px"
          options={opts}
          value={''}
        />
      </Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
