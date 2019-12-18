import React from 'react';
import { ipcRenderer } from 'electron';
import Box from '#Component/Box';
import SelectFile from '#Component/Form/SelectFile';
import Dropdown from '#Component/Form/Dropdown';
import SubmitArea from '#Component/Form/SubmitArea';
import Button from '#Component/Form/Button';
import { StoreContext } from '#State';
import Flex from '#Component/Flex';
import { useTranslation } from '#Util/translation';
import useToast from '#Util/useToast';
import useIpc from '#Util/useIpc';
import setTitle from '#Util/setTitle';

import i18n from '../i18n';
import { AVAILABLE_LOCALES } from '../locales';

const Settings = () => {
  setTitle('settings');
  const { t } = useTranslation(['settings', 'common']);
  const { gstate, dispatch } = React.useContext(StoreContext);
  const { settings } = gstate;
  const [form, setForm] = React.useState(settings);
  const [toast] = useToast();
  const [saveSettings] = useIpc();
  const [fetchInit, loadInit] = useIpc();

  const sourceportOptions = gstate.sourceports.map(item => ({
    label: item.name,
    value: item.id
  }));

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
    // TODO: error handling
    e.preventDefault();
    const newSettings = await saveSettings('settings/save', form);
    dispatch({ type: 'settings/save', data: newSettings });

    const newState = await fetchInit('main/init', null);
    dispatch({ type: 'main/init', data: newState });
    toast('Settings Saved', 'ok');
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

            <Dropdown
              name="defaultsourceport"
              options={sourceportOptions}
              label="Favourite Sourceport"
              value={form.defaultsourceport}
              onChange={onComponent}
            />
          </Flex.Col>
        </Flex.Grid>

        <SubmitArea>
          <Button type="submit" load={loadInit} width="200px">
            {t('settings:save')}
          </Button>
        </SubmitArea>
      </form>
    </Box>
  );
};

export default Settings;
