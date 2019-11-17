import React from 'react';

import Box from '#Component/Box';
import styled from 'styled-components';

const Wads = styled(({ ...rest }) => {
  return (
    <div {...rest}>
      <Box>test</Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
