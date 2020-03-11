import { useEffect } from 'react';
import { useTranslation } from './index';

function setTitle(title) {
  const { t } = useTranslation('nav');
  useEffect(() => {
    window.document.title = `${t('appname')} - ${t(title)}`;
  }, []);
}

export default setTitle;
