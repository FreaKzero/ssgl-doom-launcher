import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import i18n from './i18n';
import { GlobalStyle } from '#Style';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import MainLoader from '#Component/MainLoader';
import { initState, reducer, StoreContext } from '#State';
import { ipcRenderer } from 'electron';
import { useLocation } from 'wouter';
import './global.css';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [load, setLoad] = useState(true);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    async function resolve() {
      const res = await ipcRenderer.invoke('init', null);
      if (!res.error) {
        dispatch({ type: 'init', data: res.data });
        i18n.changeLanguage(res.data.settings.language || 'en');
        setTimeout(() => setLoad(false), 1);
      } else {
        setLocation('/settings');
        setLoad(false);
      }
    }
    resolve();
  }, []);

  return (
    <StoreContext.Provider value={{ gstate, dispatch }}>
      {load ? (
        <MainLoader />
      ) : (
        <Body background={gstate.settings.background}>
          <Head />
          <Routes />
        </Body>
      )}
    </StoreContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

if (module && module.hot) {
  module.hot.accept();
}
