import React from 'react';
import styled from 'styled-components';
import styles from '#Style';

const BoxStyle = styled.div`
  border: 1px solid ${styles.border.idle};
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.3);
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

  .content {
    margin-right: 5px;
  }
`;

const Box = ({ children, fixed }) => {
  return (
    <BoxStyle>
      <div className="fixed">{fixed}</div>

      <div className="scroll">
        <div className="content">{children}</div>
      </div>
    </BoxStyle>
  );
};

export default Box;
