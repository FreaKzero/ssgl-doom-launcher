import React from 'react';
import { StoreContext } from '#State';
import { setTitle, useToast, useIpc, useTranslation } from '#Util';
import { SelectFile, Dropdown, SubmitArea, Button } from '#Component/Form';
import { Flex, Box } from '#Component';
import { AVAILABLE_LOCALES } from '../locales';
import i18n from '../i18n';

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

  const onSubmit = async e => {
    // TODO: error handling
    e.preventDefault();
    const newSettings = await saveSettings('settings/save', form);
    dispatch({ type: 'settings/save', data: newSettings });

    const newState = await fetchInit('main/init', null);
    dispatch({ type: 'main/init', data: newState });
    toast('ok', t('common:success'), t('settings:toastSaved'));
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
            <Dropdown
              name="defaultsourceport"
              options={sourceportOptions}
              label="Favourite Sourceport"
              value={form.defaultsourceport}
              onChange={onComponent}
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
