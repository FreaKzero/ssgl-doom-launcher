import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from '#Style';
import Input from '#Component/Form/Input';
import Checkbox from '#Component/Form/Checkbox';
import SelectFile from '#Component/Form/SelectFile';
import { StoreContext } from '#State';
import Flex from '#Component/Flex';
import Box from '#Component/Box';
import setTitle from '#Util/setTitle';

const Meta = styled.div`
  color: #858585;
  font-size: 14px;
  margin-bottom: 5px;
`;

const SourcePortListStyle = styled.ul``;

const SourcePortStyle = styled.li`
  background: rgba(12, 8, 8, 0.8);
  border-radius: ${styles.border.radius};
  padding: 10px;
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  margin-bottom: 5px;
  user-select: none;

  & h1 {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    transition: ${styles.transition.out};
    text-transform: uppercase;
  }
`;

const SourcePort = ({ item }) => {
  return (
    <SourcePortStyle>
      <h1>{item.name}</h1>
      <Meta>{item.path}</Meta>
    </SourcePortStyle>
  );
};

const item = {
  name: 'GZDoom',
  path: '/some/path/to/where'
};

const Form = ({ item }) => {
  const [data, setData] = React.useState(item || {});

  return (
    <form>
      <Flex.Grid>
        <Flex.Col>
          <Input name="name" label="Sourceport Name" fluid />
          <Checkbox
            label="Savegame Directory Parameter"
            name="has_savedir"
            onChange={e => console.log(e)}
          />
          <Input name="fuck" placeholder="-save" fluid />
        </Flex.Col>
        <Flex.Col>
          <SelectFile name="binary" label="Binary" value="" directory fluid />
          <Checkbox
            label="Screenshot Directory Parameter"
            name="has_screendir"
            onChange={e => console.log(e)}
          />
          <Input name="fuck" placeholder="-shotdir" fluid />
        </Flex.Col>
      </Flex.Grid>
    </form>
  );
};

const SourcePorts = ({ ...rest }) => {
  setTitle('sourceports');
  const { gstate, dispatch } = React.useContext(StoreContext);
  return (
    <Flex.Grid>
      <Flex.Col width="400px">
        <Box>
          <SourcePortListStyle>
            <SourcePort item={item} />
          </SourcePortListStyle>
        </Box>
      </Flex.Col>
      <Flex.Col>
        <Box>
          <Form />
        </Box>
      </Flex.Col>
    </Flex.Grid>
  );
};

export default SourcePorts;
