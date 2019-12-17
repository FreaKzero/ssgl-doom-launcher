import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from '#Style';
import Input from '#Component/Form/Input';
import Checkbox from '#Component/Form/Checkbox';
import SelectFile from '#Component/Form/SelectFile';
import { StoreContext } from '#State';
import Flex from '#Component/Flex';
import Box from '#Component/Box';
import setTitle from '#Util/setTitle';
import Button from '../components/Form/Button';
import { useTranslation } from '#Util/translation';
import useToast from '../utils/useToast';
import SubmitArea from '../components/Form/SubmitArea';
import uuid from 'uuid-quick';

const FormBorder = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${styles.border.idle};
  border-radius: 4px;
  padding: 10px 10px 0px 10px;
  margin-bottom: 15px;
`;

const Meta = styled.div`
  color: #858585;
  font-size: 14px;
  margin-bottom: 5px;
`;

const SourcePortListStyle = styled.ul`
  margin-top: 15px;
`;

const SourcePortStyle = styled.li`
  background: rgba(12, 8, 8, 0.8);
  border-radius: ${styles.border.radius};
  padding: 10px;
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  margin-bottom: 5px;
  user-select: none;
  cursor: pointer;

  & h1 {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    transition: ${styles.transition.out};
    text-transform: uppercase;
  }

  &:hover h1 {
    color: ${styles.color.active};
  }

  &:hover {
    border: 1px solid ${styles.border.active};
  }
`;

const SourcePort = ({ item, onClick }) => {
  return (
    <SourcePortStyle onClick={onClick}>
      <h1>{item.name}</h1>
      <Meta>{item.binary}</Meta>
    </SourcePortStyle>
  );
};

const item = {
  name: 'GZDoom',
  path: '/some/path/to/where'
};

const Form = ({ item, onSave, onDelete }) => {
  const [form, setForm] = React.useState(item);
  const [toast] = useToast();
  const { t } = useTranslation('sourceports');

  useEffect(() => {
    setForm(item);
  }, [item]);

  const onInput = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onComponent = ({ name, value }) => {
    if (typeof value === 'undefined') {
      value = '';
    }

    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmitWrapper = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <Flex.Grid>
        <Flex.Col>
          <Input
            value={form.name}
            name="name"
            label="Sourceport Name"
            onChange={onInput}
            fluid
          />
          <FormBorder>
            <Checkbox
              value={form.hasSavedir}
              label="Use Savegame Parameter"
              name="hasSavedir"
              onChange={onComponent}
            />
            {form.hasSavedir ? (
              <Input
                value={form.paramSave}
                name="paramSave"
                placeholder="-save"
                onChange={onInput}
                fluid
              />
            ) : null}
          </FormBorder>

          <FormBorder>
            <Checkbox
              value={form.hasConfig}
              label="Use Config Parameter"
              name="hasConfig"
              onChange={onComponent}
            />
            {form.hasConfig ? (
              <Input
                value={form.paramConfig}
                name="paramConfig"
                placeholder="-config"
                onChange={onInput}
                fluid
              />
            ) : null}
          </FormBorder>
        </Flex.Col>
        <Flex.Col>
          <SelectFile
            value={form.binary}
            name="binary"
            label="Binary"
            directory
            fluid
          />
          <FormBorder>
            <Checkbox
              value={form.hasScreendir}
              label="Use Screenshot Parameter"
              name="hasScreendir"
              onChange={onComponent}
            />
            {form.hasScreendir ? (
              <Input
                value={form.paramScreen}
                name="paramScreen"
                placeholder="-shotdir"
                onChange={onInput}
                fluid
              />
            ) : null}
          </FormBorder>
        </Flex.Col>
      </Flex.Grid>
      <SubmitArea>
        <Button
          border={'#f55945'}
          glow={'#b8342a'}
          color={'#ff2f00'}
          onClick={onDelete(item.id)}
        >
          {t('delete')}
        </Button>
        <Button type="submit">Save Sourceport</Button>
      </SubmitArea>
    </form>
  );
};

const SourcePorts = ({ ...rest }) => {
  setTitle('sourceports');
  const { gstate, dispatch } = React.useContext(StoreContext);
  const [selected, setSelected] = React.useState(null);
  const [sourcePorts, setSourcePorts] = React.useState(gstate.sourceports);

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
      paramSave: '',
      paramConfig: '',
      hasScreendir: false,
      paramScreen: '',
      name: 'New Sourceport',
      binary: ''
    };
    setSourcePorts([...sourcePorts, item]);
  };

  const selectSourceport = item => e => setSelected(item);

  const onDeleteSourcePort = id => e => {
    setSourcePorts(sourcePorts.filter(item => item.id !== id));
  };

  const onSaveSourcePort = values => {
    const newSourcePorts = sourcePorts.map(item =>
      item.id === values.id ? values : item
    );
    setSourcePorts(newSourcePorts);
  };

  return (
    <Flex.Grid>
      <Flex.Col width="400px">
        <Box>
          <Button onClick={createSourceport} fluid>
            Add Sourceport
          </Button>
          <SourcePortListStyle>
            {sourcePorts.map(item => (
              <SourcePort
                key={item.id}
                item={item}
                onClick={selectSourceport(item)}
              />
            ))}
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
