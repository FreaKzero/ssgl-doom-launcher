import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../state';
import { setTitle, useIpc, useTranslation, useToast } from '../../utils';
import uuid from 'uuid-quick';
import { Flex, Box } from '../../components';
import { Button } from '../../components/Form';
import Form from './Form';
import SourcePortItem from './SourcePortItem';
import { AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    if (sourcePorts.length > 0) {
      setSelected(sourcePorts[0]);
    }
  }, []);

  const createSourceport = () => {
    const item = {
      id: uuid(),
      hasSavedir: false,
      hasConfig: false,
      paramSave: '-savedir',
      paramConfig: '-config',
      configFilename: '',
      configDefault: '',
      paramScreen: '',
      name: 'New Sourceport',
      binary: ''
    };
    setSourcePorts([...sourcePorts, item]);
    setSelected(item);
  };

  const selectSourceport = item => () => setSelected(item);

  const onDeleteSourcePort = id => async () => {
    const newSourcePorts = sourcePorts.filter(item => item.id !== id);

    try {
      await ipc('sourceports/save', newSourcePorts);
      setSourcePorts(newSourcePorts);
      dispatch({ type: 'sourceports/save', data: newSourcePorts });
      toast('ok', t('common:success'), t('sourceports:toastDeleted'));
    } catch (e) {
      toast('danger', 'Error ?!');
    }
  };

  const onSaveSourcePort = async values => {
    const newSourcePorts = sourcePorts.map(item =>
      item.id === values.id ? values : item
    );
    try {
      await ipc('sourceports/save', newSourcePorts);
      setSourcePorts(newSourcePorts);
      dispatch({ type: 'sourceports/save', data: newSourcePorts });
      toast('ok', t('common:success'), t('sourceports:toastSaved'));
    } catch (e) {
      toast('Error ?!', 'danger');
    }
  };

  return (
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
  );
};

export default SourcePorts;
