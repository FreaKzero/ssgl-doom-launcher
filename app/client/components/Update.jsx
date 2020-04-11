import { remote } from 'electron';
import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import { StoreContext } from '../state';
import { Button } from './Form';
import { Modal } from './index';

const MarkdownStyle = styled.div`
  max-height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: black;
  border-radius: 4px;
  padding: 0 10px 10px 10px;
  ${({ theme }) => theme.scrollbar};

  p {
    margin-bottom: 10px;
  }

  ul {
    color: red;
    list-style-type: square;
    padding-left: 20px;
    margin: 10px;
  }

  code {
    display: block;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid darkgrey;
    margin: 10px 0 10px 0;
  }
`;
const Update = () => {
  const { gstate, dispatch } = useContext(StoreContext);

  const onOk = () => {
    remote.shell.openExternal(gstate.update.download);
    dispatch({ type: 'update/done' });
  };

  const onCancel = () => {
    dispatch({ type: 'update/done' });
  };

  return (
    <Modal
      active={true}
      title={`Version ${gstate.update.version} Available`}
      strict
    >
      <MarkdownStyle>
        <ReactMarkdown source={gstate.update.changelog} />
      </MarkdownStyle>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Button
          type="button"
          border={'#f55945'}
          glow={'#b8342a'}
          color={'#ff2f00'}
          onClick={onCancel}
          width="100px"
        >
          Not now
        </Button>
        <Button
          type="button"
          style={{ margin: 0 }}
          width="100px"
          onClick={onOk}
        >
          Download
        </Button>
      </div>
    </Modal>
  );
};

export default Update;
