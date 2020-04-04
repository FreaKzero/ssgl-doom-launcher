import { AnimatePresence } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Box, Flex } from '../../components';
import Confirm from '../../components/Confirm';
import { Button } from '../../components/Form';
import { StoreContext } from '../../state';
import { setTitle, useIpc, useToast, useTranslation } from '../../utils';
import Form from './Form';
import SourcePortItem from './SourcePortItem';

const SourcePortListStyle = styled.ul`
  margin-top: 15px;
`;

const SourcePorts = () => {
  setTitle('sourceports');
  const { gstate, dispatch } = useContext(StoreContext);
  const [selected, setSelected] = useState(null);
  const [sourcePorts, setSourcePorts] = useState(gstate.sourceports);
  const [ipc] = useIpc();
  const [toast] = useToast();
  const { t } = useTranslation(['sourceports', 'common']);
  const [confirm, setConfirm] = useState({ id: null, open: false });
  useEffect(() => {
    if (sourcePorts.length > 0) {
      setSelected(sourcePorts[0]);
    }
  }, []);

  const createSourceport = () => {
    const item = {
      id: null,
      hasSavedir: false,
      hasConfig: false,
      paramLoad: '-loadgame',
      paramSave: '-savedir',
      paramConfig: '-config',
      configFilename: 'gzdoom.ini',
      configDefault: '',
      name: 'New Sourceport',
      binary: ''
    };
    setSourcePorts([...sourcePorts, item]);
    setSelected(item);
  };

  const selectSourceport = item => () => setSelected(item);

  const onOkDelete = async () => {
    if (!confirm.id) {
      return;
    }

    try {
      const newSourceports = await ipc('sourceports/delete', confirm.id);
      setSourcePorts(newSourceports);
      dispatch({ type: 'sourceports/save', data: newSourceports });
      setConfirm({
        id: null,
        open: false
      });
      setSelected(sourcePorts[0]);
    } catch (e) {
      toast('danger', 'Error ?!');
    }
  };

  const onDeleteSourcePort = id => () =>
    setConfirm({
      id: id,
      open: true
    });

  const onCancelDelete = () =>
    setConfirm({
      id: null,
      open: false
    });

  const onSaveSourcePort = async sourceport => {
    try {
      const newSourcePorts = await ipc('sourceports/save', sourceport);
      setSourcePorts(newSourcePorts);
      dispatch({ type: 'sourceports/save', data: newSourcePorts });
      toast('ok', t('common:success'), t('sourceports:toastSaved'));
    } catch (e) {
      console.log(e);
      toast('Error ?!', 'danger');
    }
  };

  return (
    <>
      <Flex.Grid>
        <Flex.Col width="450px">
          <Box>
            <Button onClick={createSourceport} fluid>
              Add Sourceport
            </Button>
            <SourcePortListStyle>
              <AnimatePresence>
                {sourcePorts.map(item => (
                  <SourcePortItem
                    className={
                      selected && item.id === selected.id ? 'active' : undefined
                    }
                    key={item.id}
                    item={item}
                    onClick={selectSourceport(item)}
                  />
                ))}
              </AnimatePresence>
            </SourcePortListStyle>
          </Box>
        </Flex.Col>
        <Flex.Col>
          <Box>
            {selected ? (
              <>
                <Form
                  item={selected}
                  onSave={onSaveSourcePort}
                  onDelete={onDeleteSourcePort}
                />
              </>
            ) : null}
          </Box>
        </Flex.Col>
      </Flex.Grid>
      <Confirm
        active={confirm.open}
        onOk={onOkDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
};

export default SourcePorts;
