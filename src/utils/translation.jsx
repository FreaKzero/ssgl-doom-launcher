import React from 'react';
import { useTranslation } from "react-i18next";

const T = ({ children, ns = ["common"], values }) => {
  const { t, i18n } = useTranslation(ns);
  return t(children, values);
};

export {
    T,
    useTranslation
};
