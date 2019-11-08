import { useTranslation } from 'react-i18next';

const T = ({ children, ns = ['common'], values }) => {
  const { t } = useTranslation(ns);
  return t(children, values);
};

export { T, useTranslation };
