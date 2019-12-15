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
  name: 'fuck',
  path: 'this'
};

const Form = ({ item }) => {
  const [data, setData] = React.useState(item || {});

  return (
    <form>
      <Input name="fuck" label="Sourceport Name" />
      <SelectFile name="savepath" label="Binary" value="" directory fluid />
      <Checkbox label="fuck you" name="fu" onChange={e => console.log(e)} />
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
