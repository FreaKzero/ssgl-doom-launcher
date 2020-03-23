import './global.css';

import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import { Body, Head, MainLoader, Routes, ToastContainer } from './components';
import i18n from './i18n';
import { initState, reducer, StoreContext } from './state';
import { useIpc } from './utils';
import { useHashLocation } from './utils';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [fetch, loading] = useIpc({ delayLoad: 1000 });
  const [location, navigate] = useHashLocation();

  useEffect(() => {
    async function resolve() {
      try {
        const data = await fetch('main/init');
        dispatch({ type: 'main/init', data: data });
        i18n.changeLanguage(data.settings.language || 'en');
        navigate(data.settings.startView || '/');
      } catch (e) {
        navigate('/settings');
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
