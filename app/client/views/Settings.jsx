import React, { useContext, useState } from 'react';

import { Box, Flex } from '../components';
import { Button, Dropdown, SelectFile, SubmitArea } from '../components/Form';
import i18n from '../i18n';
import { AVAILABLE_LOCALES } from '../locales';
import { StoreContext } from '../state';
import { setTitle, useIpc, useToast, useTranslation } from '../utils';

const Settings = () => {
  setTitle('settings');
  const { t } = useTranslation(['settings', 'common', 'nav']);
  const { gstate, dispatch } = useContext(StoreContext);
  const { settings } = gstate;
  const [form, setForm] = useState(settings);
  const [errors, setError] = useState({});
  const [toast] = useToast();
  const [saveSettings] = useIpc();
  const [fetchInit, loadInit] = useIpc();

  const viewOptions = [
    {
      label: t('nav:wads'),
      value: '/'
    },
    {
      label: t('nav:packages'),
      value: '/packages'
    }
  ];

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

  const validate = () => {
    const fields = ['modpath', 'savepath', 'defaultsourceport'];
    let temp = {};
    let hasError = false;

    fields.forEach(field => {
      if (!form[field] || form[field].trim() === '') {
        hasError = true;
        temp = {
          ...temp,
          [field]: t('common:required')
        };
      } else {
        temp = {
          ...temp,
          [field]: null
        };
      }
    });

    setError(temp);

    return hasError;
  };

  const onSubmit = async e => {
    e.preventDefault();
    const hasError = validate();

    if (!hasError) {
      const newSettings = await saveSettings('settings/save', form);
      dispatch({ type: 'settings/save', data: newSettings });

      const newState = await fetchInit('main/init', null);
      dispatch({ type: 'main/init', data: newState });
      toast('ok', t('common:success'), t('settings:toastSaved'));
    } else {
      toast('danger', t('common:error'), t('common:toastRequired'));
    }
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Flex.Grid>
          <Flex.Col width="50%">
            <SelectFile
              name="modpath"
              onFile={onComponent}
              label={t('settings:waddir')}
              value={form.modpath}
              error={errors.modpath}
              directory
              fluid
            />
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
              error={errors.defaultsourceport}
            />
          </Flex.Col>
          <Flex.Col width="50%">
            <SelectFile
              name="savepath"
              onFile={onComponent}
              label={t('settings:savepath')}
              value={form.savepath}
              error={errors.savepath}
              directory
              fluid
            />
            {gstate.packages.length > 0 ? (
              <Dropdown
                name="startView"
                options={viewOptions}
                label="Startview"
                value={form.startView}
                onChange={onComponent}
              />
            ) : null}
            <Dropdown
              name="language"
              options={AVAILABLE_LOCALES}
              label={t('common:language')}
              value={form.language}
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
