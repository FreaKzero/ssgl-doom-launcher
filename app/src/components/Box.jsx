import React from 'react';
import styled from 'styled-components';
import ModItem from '#Component/ModItem/index.jsx';
import style from '#Style';

const Box = styled(({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
})`
  border: 1px solid #6c6c6c;
  backdrop-filter: blur(10px);
  border-radius: 7px;
  height: 70vh;
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  overflow-y: scroll;
  overflow-x: hidden;

  ${style.scrollbar}
`;

const Boxes = styled(({ ...rest }) => {
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
  margin: 20px;
`;

export default Boxes;

/* Rectangle 20 */
