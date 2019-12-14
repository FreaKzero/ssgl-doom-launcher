import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import { GlobalStyle } from '#Style';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import ErrorMessage from '#Component/ErrorMessage';
import PlayOverlay from '#Component/PlayOverlay';
import PlayIcon from '#Component/PlayIcon';
import MainLoader from '#Component/MainLoader';
import { initState, reducer, StoreContext } from '#State';
import { ipcRenderer } from 'electron';
import { useLocation } from 'wouter';
import './global.css';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [poActive, setPoActive] = useState(false);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    async function resolve() {
      const res = await ipcRenderer.invoke('init', null);
      if (!res.error) {
        dispatch({ type: 'init', data: res.data });
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
          <PlayIcon
            active={gstate.selected.length}
            onClick={() => setPoActive(true)}
          />
          <PlayOverlay active={poActive} setActive={setPoActive} />
        </Body>
      )}
    </StoreContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

if (module && module.hot) {
  module.hot.accept();
}
