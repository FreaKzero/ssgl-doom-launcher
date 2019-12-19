import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import { StoreContext } from '#State';
import { Flex, Box } from '#Component';
import { setTitle, useIpc, useTranslation, useToast } from '#Util';
import uuid from 'uuid-quick';
import {
  Input,
  Checkbox,
  SelectFile,
  Button,
  SubmitArea
} from '#Component/Form';

const FormBorder = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${styles.border.idle};
  border-radius: ${styles.border.radius};
  padding: 10px 10px 0 10px;
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

  &.active {
    padding-left: 25px;
  }

  &:hover h1,
  &.active h1 {
    color: ${styles.color.active};
  }

  &:hover,
  &.active {
    border: 1px solid ${styles.border.active};
  }
`;

const SourcePort = ({ item, onClick, ...rest }) => {
  return (
    <SourcePortStyle onClick={onClick} {...rest}>
      <h1>{item.name}</h1>
      <Meta>{item.binary}</Meta>
    </SourcePortStyle>
  );
};

SourcePort.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    binary: PropTypes.string
  }),
  onClick: PropTypes.func.isRequired
};

const Form = ({ item, onSave, onDelete }) => {
  const [form, setForm] = React.useState(item);
  const { t } = useTranslation(['sourceports']);

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

    if (name === 'binary' && value) {
      const namevalue = value
        .split('\\')
        .pop()
        .split('/')
        .pop()
        .split('.')[0];

      setForm({
        ...form,
        [name]: value,
        name: namevalue
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const onSubmitWrapper = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={onSubmitWrapper}>
      <SelectFile
        onFile={onComponent}
        value={form.binary}
        name="binary"
        label={t('sourceports:binary')}
        fluid
      />
      <Input
        value={form.name}
        name="name"
        label={t('sourceports:name')}
        fluid
      />

      <Flex.Grid>
        <Flex.Col>
          <FormBorder>
            <Checkbox
              value={form.hasSavedir}
              label={t('sourceports:savegameparam')}
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
              label={t('sourceports:configparam')}
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
          <FormBorder>
            <Checkbox
              value={form.hasScreendir}
              label={t('sourceports:screenshot')}
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
        <Button type="submit" width="200px">
          {t('sourceports:save')}
        </Button>
      </SubmitArea>
    </form>
  );
};

Form.propTypes = {
  item: PropTypes.shape({
    binary: PropTypes.string,
    hasConfig: PropTypes.bool,
    hasSavedir: PropTypes.bool,
    hasScreendir: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    paramConfig: PropTypes.string,
    paramSave: PropTypes.string,
    paramScreen: PropTypes.string
  }),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

const SourcePorts = () => {
  setTitle('sourceports');
  const { gstate, dispatch } = React.useContext(StoreContext);
  const [selected, setSelected] = React.useState(null);
  const [sourcePorts, setSourcePorts] = React.useState(gstate.sourceports);
  const [ipc] = useIpc();
  const [toast] = useToast();

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

  const selectSourceport = item => () => setSelected(item);

  const onDeleteSourcePort = id => async () => {
    const newSourcePorts = sourcePorts.filter(item => item.id !== id);

    try {
      await ipc('sourceports/save', newSourcePorts);
      setSourcePorts(newSourcePorts);
      dispatch({ type: 'sourceports/save', data: newSourcePorts });
      toast('Deleted Sourceport');
    } catch (e) {
      toast('Error ?!', 'danger');
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
      toast('Saved Sourceport');
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
            {sourcePorts.map(item => (
              <SourcePort
                className={
                  selected && item.id === selected.id ? 'active' : undefined
                }
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
