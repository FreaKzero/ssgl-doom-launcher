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
    overflow-y: ${p => (p.noscroll ? 'hidden' : 'scroll')};
    ${p => (p.noscroll ? null : styles.scrollbar)};
    height: ${p => (p.fixed ? 'calc(100vh - 195px)' : '100%')};
    overflow-x: hidden;
  }

  .content {
    margin-right: 5px;
  }
`;

// TODO: define scrollbar...
const Box = ({ children, fixed, noscroll = false }) => {
  return (
    <BoxStyle noscroll={noscroll} fixed={fixed}>
      {fixed ? <div className="fixed">{fixed}</div> : null}

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
