import React from 'react';
import styled from 'styled-components';
import { ipcRenderer, remote } from 'electron';
import Box from '#Component/Box';
import SelectFile from '#Component/Form/SelectFile';
import Button from '#Component/Form/Button';
import { StoreContext } from '#State';
import setTitle from '#Util/setTitle';

const Wads = styled(({ ...rest }) => {
  setTitle('settings');
  const [form, setForm] = React.useState({});
  const { gstate, dispatch } = React.useContext(StoreContext);
  const { settings } = gstate;

  React.useEffect(() => {
    setForm(settings);
  }, []);

  const onFile = ({ name, file }) =>
    setForm({
      ...form,
      [name]: file
    });

  const onInput = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = async e => {
    // TODO: error handling
    e.preventDefault();
    const res = await ipcRenderer.invoke('settings/save', form);
    // TODO: data.data ?! fix this
    dispatch({ type: 'settings/save', data: res.data.data });
    setForm(res.data.data);

    const newState = await ipcRenderer.invoke('init', null);
    dispatch({ type: 'init', data: newState.data });
  };

  return (
    <div {...rest}>
      <Box>
        <form onSubmit={onSubmit}>
          <SelectFile
            name="background"
            onFile={onFile}
            label="background"
            value={form.background}
            fluid
          />

          <SelectFile
            name="modpath"
            onFile={onFile}
            label="wads"
            value={form.modpath}
            directory
            fluid
          />

          <SelectFile
            name="portpath"
            onFile={onFile}
            label="portpath"
            value={form.portpath}
            fluid
          />

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
