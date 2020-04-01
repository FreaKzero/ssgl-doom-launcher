import { remote } from 'electron';
import React, { useContext } from 'react';

import { StoreContext } from '../state';
import { Button } from './Form';
import { Modal } from './index';

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
      <pre>{gstate.update.changelog}</pre>
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
