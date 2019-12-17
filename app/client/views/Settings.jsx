import React from 'react';
import { ipcRenderer } from 'electron';
import Box from '#Component/Box';
import SelectFile from '#Component/Form/SelectFile';
import Dropdown from '#Component/Form/Dropdown';
import SubmitArea from '#Component/Form/SubmitArea';
import Button from '#Component/Form/Button';
import { StoreContext } from '#State';
import setTitle from '#Util/setTitle';
import Flex from '../components/Flex';
import { useTranslation } from '#Util/translation';
import useToast from '../utils/useToast';
import i18n from '../i18n';
import { AVAILABLE_LOCALES } from '../locales';

const Settings = () => {
  setTitle('settings');
  const { t } = useTranslation(['settings', 'common']);
  const { gstate, dispatch } = React.useContext(StoreContext);
  const { settings } = gstate;
  const [form, setForm] = React.useState(settings);
  const [save, setSave] = React.useState(false);
  const [toast] = useToast();

  const onComponent = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value ? value : ''
    });

    switch (name) {
      case 'language':
        return i18n.changeLanguage(value);
    }
  };

  const onInput = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = async e => {
    setSave(true);
    // TODO: error handling
    e.preventDefault();
    const res = await ipcRenderer.invoke('settings/save', form);
    // TODO: data.data ?! fix this
    console.log(form);
    dispatch({ type: 'settings/save', data: res.data.data });
    setForm(res.data.data);

    const newState = await ipcRenderer.invoke('init', null);
    dispatch({ type: 'init', data: newState.data });
    toast('Settings Saved', 'ok');
    setSave(false);
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Flex.Grid>
          <Flex.Col width="50%">
            <SelectFile
              name="background"
              onFile={onComponent}
              label={t('settings:wallpaper')}
              value={form.background}
              fluid
            />
            <SelectFile
              name="screenpath"
              onFile={onComponent}
              label={t('settings:screenpath')}
              value={form.screenpath}
              directory
              fluid
            />
            <Dropdown
              name="language"
              options={AVAILABLE_LOCALES}
              label={t('common:language')}
              value={form.language}
              onChange={onComponent}
            />
          </Flex.Col>
          <Flex.Col width="50%">
            <SelectFile
              name="modpath"
              onFile={onComponent}
              label={t('settings:waddir')}
              value={form.modpath}
              directory
              fluid
            />
            <SelectFile
              name="savepath"
              onFile={onComponent}
              label={t('settings:savepath')}
              value={form.savepath}
              directory
              fluid
            />

            <SelectFile
              name="portpath"
              onFile={onComponent}
              label="Sourceport"
              value={form.portpath}
              fluid
            />
          </Flex.Col>
        </Flex.Grid>

        <SubmitArea>
          <Button type="submit" load={save}>
            Save Sourceport
          </Button>
        </SubmitArea>
      </form>
    </Box>
  );
};

export default Settings;
