import React from 'react';
import { T } from '#Util/translation';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem';
import Dropdown from '#Component/Dropdown';
import { ipcRenderer } from 'electron';

const Wads = styled(({ ...rest }) => {
  const [test, setTest] = React.useState(null);

  const onClick = () => {
    ipcRenderer.invoke('modlist', null).then(data => {
      console.log(data);
      setTest(data);
    });
  };

  return (
    <div {...rest}>
      <Box>{test ? test.map(item => <ModItem name={item.name} />) : null}</Box>
      <Box></Box>
      <Box>
        <button onClick={onClick}>test</button>
        {test ? test.data : null}
      </Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
