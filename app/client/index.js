import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import i18n from './i18n';
import { initState, reducer, StoreContext } from '#State';
import useIpc from '#Util/useIpc';
import { useLocation } from 'wouter';
import { Body, Head, Routes, MainLoader, ToastContainer } from '#Component';

import './global.css';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [fetch, loading] = useIpc({ delayLoad: 1000 });

  useEffect(() => {
    async function resolve() {
      try {
        const data = await fetch('main/init');
        dispatch({ type: 'main/init', data: data });
        setLocation('/');
        i18n.changeLanguage(data.settings.language || 'en');
      } catch (e) {
        console.log(e);
        setLocation('/settings');
      }
    }
    resolve();
  }, []);

  return (
    <ToastContainer>
      <StoreContext.Provider value={{ gstate, dispatch }}>
        {loading ? (
          <MainLoader />
        ) : (
          <Body background={gstate.settings.background}>
            <Head />
            <Routes />
          </Body>
        )}
      </StoreContext.Provider>
    </ToastContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

if (module && module.hot) {
  module.hot.accept();
}
