import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import { GlobalStyle } from '#Style';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import PlayOverlay from '#Component/PlayOverlay';
import PlayIcon from '#Component/PlayIcon';
import MainLoader from '#Component/MainLoader';
import { initState, reducer, StoreContext } from '#State';
import { ipcRenderer } from 'electron';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [poActive, setPoActive] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    ipcRenderer
      .invoke('init', null)
      .then(res => {
        if (res.data) {
          dispatch({ type: 'init', data: res.data });
        }
        setTimeout(() => setLoad(false), 1000);
      })
      .catch(e => {
        console.log('catched');
        console.log('error ?!' + e);
      });
  }, []);

  return (
    <StoreContext.Provider value={{ gstate, dispatch }}>
      <GlobalStyle />

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
