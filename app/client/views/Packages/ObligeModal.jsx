import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import Flex from '../../components/Flex';
import { Button } from '../../components/Form';
import Modal from '../../components/Modal';
import { StoreContext } from '../../state';
import { useIpc, useTranslation } from '../../utils';
import ConfigDropdown from './ConfigDropdown';
import Loader from './Loader';
import ObligeLog from './ObligeLog';

const ButtonArea = styled.div`
  display: flex;
  margin-top: 30px;

  button {
    width: 100%;
  }
`;
const ObligeModal = ({ pack, toggle, active }) => {
  // eslint-disable-next-line no-unused-vars
  const { gstate, dispatch } = useContext(StoreContext);
  const { t } = useTranslation(['oblige', 'common']);
  const [ipc] = useIpc();
  const [buildIpc, building] = useIpc();
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [errors, setErrors] = useState(false);
  const [message, setMessage] = useState(null);
  const [buildState, setBuildState] = useState(null);
  const logref = React.useRef(null);

  const onConfigChange = ({ value }) => setSelectedConfig(value);

  const validate = () =>
    !selectedConfig ? { selectedConfig: t('common:required') } : false;

  const onOpen = what => {
    ipc('oblige/open', what);
  };
  const onPlay = async () => {
    const newPackages = await ipc('packages/play', {
      pack: pack,
      load: false,
      oblige: true
    });
    dispatch({ type: 'packages/save', packages: newPackages, package: null });
    onClose();
  };

  const onBuild = async () => {
    setBuildState(true);
    const hasError = validate();
    if (hasError) {
      return setErrors(hasError);
    } else {
      try {
        const interval = setInterval(() => {
          const msg = ipcRenderer.sendSync('log', 'ping');
          setMessage(msg);
          logref.current.scrollTop = logref.current.scrollHeight;
        }, 2000);

        const generatedWad = await buildIpc('oblige/build', {
          config: selectedConfig,
          pack: pack
        });

        clearInterval(interval);

        const newPackages = await ipc('packages/play', {
          pack: pack,
          load: false,
          oblige: generatedWad
        });

        dispatch({
          type: 'packages/save',
          packages: newPackages,
          package: null
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onClose = () => {
    setBuildState(null);
    toggle(null);
  };

  return (
    <Modal
      active={active}
      onBackdrop={building ? () => 1 : onClose}
      title={t('oblige:modalTitle')}
      tiny
    >
      {building ? <Loader /> : null}

      {buildState !== null ? (
        <>
          <ObligeLog ref={logref}>{message}</ObligeLog>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            {!building ? (
              <Button type="button" onClick={onClose} width="140px">
                {t('common:close')}
              </Button>
            ) : null}
          </div>
        </>
      ) : null}
      {buildState === null ? (
        <>
          <div style={{ margin: '20px 0 10px 0' }}>
            <Flex.Grid>
              <Flex.Col width="50%">
                <Button
                  type="button"
                  style={{ margin: 0 }}
                  onClick={() => onOpen('binary')}
                  fluid
                >
                  {t('oblige:open')}
                </Button>
              </Flex.Col>
              <Flex.Col width="50%">
                <Button
                  type="button"
                  style={{ margin: 0 }}
                  onClick={() => onOpen('configs')}
                  fluid
                >
                  {t('oblige:openDir')}
                </Button>
              </Flex.Col>
            </Flex.Grid>
          </div>
          <ConfigDropdown
            onChange={onConfigChange}
            value={selectedConfig}
            error={errors.selectedConfig}
          />
          <ButtonArea>
            <Button
              type="button"
              border={'#f55945'}
              glow={'#b8342a'}
              color={'#ff2f00'}
              onClick={onClose}
              width="140px"
            >
              {t('common:cancel')}
            </Button>
            <Button type="button" width="140px" onClick={onPlay}>
              {t('oblige:last')}
            </Button>
            <Button
              type="button"
              width="140px"
              style={{ margin: 0 }}
              onClick={onBuild}
            >
              {t('oblige:build')}
            </Button>
          </ButtonArea>
        </>
      ) : null}
    </Modal>
  );
};

ObligeModal.propTypes = {
  active: PropTypes.bool.isRequired,
  pack: PropTypes.any.isRequired,
  toggle: PropTypes.func.isRequired
};

export default ObligeModal;
