import React from 'react';
import styled from 'styled-components';
import { ipcRenderer, remote } from 'electron';
import Box from '#Component/Box';
import SelectFile from '#Component/Form/SelectFile';
import Button from '#Component/Form/Button';
import { StoreContext } from '#State';
import setTitle from '#Util/setTitle';
import Flex from '../components/Flex';
import { useTranslation } from '#Util/translation';

const Settings = () => {
  setTitle('settings');
  const { t } = useTranslation('settings');
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
    <Box>
      <form onSubmit={onSubmit}>
        <Flex.Grid>
          <Flex.Col width="50%">
            <SelectFile
              name="background"
              onFile={onFile}
              label={t('wallpaper')}
              value={form.background}
              fluid
            />
          </Flex.Col>
          <Flex.Col width="50%">
            <SelectFile
              name="modpath"
              onFile={onFile}
              label={t('waddir')}
              value={form.modpath}
              directory
              fluid
            />
          </Flex.Col>
        </Flex.Grid>

        <SelectFile
          name="portpath"
          onFile={onFile}
          label="Sourceport"
          value={form.portpath}
          fluid
        />

        <Button type="submit">{t('save')}</Button>
      </form>
    </Box>
  );
};

export default Settings;
