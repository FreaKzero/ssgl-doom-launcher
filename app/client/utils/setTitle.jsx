import { useEffect } from 'react';
import { useTranslation } from '#Util/translation';

function setTitle(title) {
  const { t } = useTranslation('nav');
  useEffect(() => {
    window.document.title = `${t('appname')} - ${t(title)}`;
  }, []);
}

export default setTitle;
