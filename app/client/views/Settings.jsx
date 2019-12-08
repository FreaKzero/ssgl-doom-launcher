import React from 'react';
import Box from '#Component/Box';
import Input from '#Component/Input';
import styled from 'styled-components';
import { StoreContext } from '#State';
import { ipcRenderer, remote } from 'electron';
import setTitle from '#Util/setTitle';

const Wads = styled(({ ...rest }) => {
  setTitle('settings');
  const [form, setForm] = React.useState({});
  const { gstate, dispatch } = React.useContext(StoreContext);
  const { settings } = gstate;

  React.useEffect(() => {
    setForm(settings);
  }, []);

  const onInput = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    ipcRenderer.invoke('settings/save', form).then(res => {
      dispatch({ type: 'settings/save', data: res.data });
    });
  };

  const doTest = () => {
    s;
    remote.dialog.showOpenDialog().then(res => {
      console.log(res.filePaths[0]);
    });
  };
  return (
    <div {...rest}>
      <Box>
        <button onClick={doTest}>Test it ! </button>
        <form onSubmit={onSubmit}>
          <label>Wads</label>
          <Input onChange={onInput} name="modpath" value={form.modpath} />

          <label>GZDOOM</label>
          <Input onChange={onInput} name="portpath" value={form.portpath} />

          <input type="submit" value="sub" />
        </form>
      </Box>
    </div>
  );
})`
  display: flex;
  margin: 15px;
`;

export default Wads;
