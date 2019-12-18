import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import i18n from './i18n';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import MainLoader from '#Component/MainLoader';
import ToastContainer from '#Component/Toast';
import { initState, reducer, StoreContext } from '#State';
import useIpc from '#Util/useIpc';
import { useLocation } from 'wouter';

import './global.css';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [location, setLocation] = useLocation();
  const [fetch, loading] = useIpc({ delayLoad: 1000 });

  useEffect(() => {
    async function resolve() {
      try {
        const data = await fetch('main/init');
        dispatch({ type: 'main/init', data: data });
        console.log(data);
        i18n.changeLanguage(data.settings.language || 'en');
      } catch (e) {
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
