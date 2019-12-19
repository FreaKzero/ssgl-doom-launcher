import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';

const BoxStyle = styled.div`
  border: 1px solid ${styles.border.idle};
  border-radius: ${styles.border.radius};
  background: ${styles.box.backdrop};
  backdrop-filter: blur(5px);
  flex-grow: 1;
  padding: 10px;
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

// TODO: define scrollbar...
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

Box.propTypes = {
  children: PropTypes.any,
  fixed: PropTypes.element
};

export default Box;
