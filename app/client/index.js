import React, { useReducer, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from '#Style';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import { initState, reducer, StoreContext } from '#State';
import { ipcRenderer } from 'electron';
import './i18n';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    ipcRenderer
      .invoke('modlist', null)
      .then(res => dispatch({ type: 'load', data: res.data }));
  }, []);

  return (
    <StoreContext.Provider value={{ gstate, dispatch }}>
      <GlobalStyle />
      <Body>
        <Head />
        <Routes />
      </Body>
    </StoreContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
