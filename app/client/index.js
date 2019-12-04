import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from '#Style';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import PlayOverlay from '#Component/PlayOverlay';
import PlayIcon from '#Component/PlayIcon';
import { initState, reducer, StoreContext } from '#State';
import { ipcRenderer } from 'electron';
import './i18n';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);
  const [test, setTest] = useState(false);
  useEffect(() => {
    ipcRenderer.invoke('init', null).then(res => {
      dispatch({ type: 'init', data: res.data });
    });
  }, []);

  return (
    <StoreContext.Provider value={{ gstate, dispatch }}>
      <GlobalStyle />
      <Body>
        <Head />
        <Routes />
        <PlayIcon
          active={gstate.selected.length}
          onClick={() => setTest(true)}
        />
        <PlayOverlay active={test} setActive={setTest} />
      </Body>
    </StoreContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
