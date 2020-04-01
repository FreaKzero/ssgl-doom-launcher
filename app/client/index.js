import './global.css';

import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { Body, Head, MainLoader, Routes, ToastContainer } from './components';
import Update from './components/Update';
import i18n from './i18n';
import { initState, reducer, StoreContext } from './state';
import themes from './Theme';
import { useIpc } from './utils';
import { useHashLocation } from './utils';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [fetch, loading] = useIpc({ delayLoad: 1000 });
  // eslint-disable-next-line no-unused-vars
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

      try {
        const update = await fetch('main/checkupdate');
        dispatch({ type: 'update/set', data: update, done: false });
      } catch (e) {
        console.log('blubb');
      }
    }
    resolve();
  }, []);

  return (
    <ThemeProvider theme={themes['hell']}>
      <ToastContainer>
        <StoreContext.Provider value={{ gstate, dispatch }}>
          {loading ? (
            <MainLoader />
          ) : (
            <Body background={gstate.settings.background}>
              {gstate.update.available ? <Update /> : null}
              <Head />
              <Routes />
            </Body>
          )}
        </StoreContext.Provider>
      </ToastContainer>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

if (module && module.hot) {
  module.hot.accept();
}
