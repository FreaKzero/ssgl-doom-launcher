import React from 'react';
import styled from 'styled-components';
import styles from '#Style';

const BoxStyle = styled.div`
  border: 1px solid ${styles.border.idle};
  backdrop-filter: blur(5px);
  border-radius: 7px;
  flex-grow: 1;
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  height: calc(100vh - 140px);
  .scroll {
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 195px);
    ${styles.scrollbar}
  }
`;

const Box = ({ children, fixed, ...rest }) => {
  return (
    <BoxStyle>
      <div className="fixed">{fixed}</div>

      <div className="scroll">{children}</div>
    </BoxStyle>
  );
};

export default Box;
