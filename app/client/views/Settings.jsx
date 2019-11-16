import React, { useState, useEffect } from 'react';
import { T } from '#Util/translation';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem';
import Dropdown from '#Component/Dropdown';
import Input from '#Component/Input';
import { StoreContext } from '#State';
import { ipcRenderer } from 'electron';

const Wads = styled(({ ...rest }) => {
  const { gstate, dispatch } = React.useContext(StoreContext);
  
  return (
    <div {...rest}>
      <Box></Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
