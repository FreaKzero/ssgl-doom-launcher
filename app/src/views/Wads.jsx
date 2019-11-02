import React from 'react';
import { T } from '#Util/translation';
import Box from '#Component/Box';
import styled from 'styled-components';
import ModItem from '#Component/ModItem/index';

const Wads = styled(({ ...rest }) => {
  return (
    <div {...rest}>
      <Box>
        {new Array(15).fill(1).map(() => (
          <ModItem />
        ))}
      </Box>
      <Box />
      <Box />
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
