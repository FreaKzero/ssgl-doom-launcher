import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import { initState, reducer, StoreContext } from '#State';
import './assets/base.css';
import './i18n';

const App = () => {
  const [gstate, dispatch] = useReducer(reducer, initState);

  return (
    <StoreContext.Provider value={{ gstate, dispatch }}>
      <Body>
        <Head />
        <Routes />
      </Body>
    </StoreContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
