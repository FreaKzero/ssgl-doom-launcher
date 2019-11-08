import React from 'react';
import ReactDOM from 'react-dom';
import Body from '#Component/Body';
import Head from '#Component/Head';
import Routes from '#Component/Router';
import './assets/base.css';
import './i18n';

const App = () => {
  return (
    <Body>
      <Head />
      <Routes />
    </Body>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
