import React from 'react';
import styled from 'styled-components';
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

export default Box;

/* Rectangle 20 */
