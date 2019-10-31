import React from 'react';
import ReactDOM from 'react-dom';
import Headline from '#Component/Headline';
import Body from '#Component/Body';
import NavList from '#Component/Nav/NavList';
import Routes from '#Component/Router';
import './assets/base.css';
import './i18n';

const App = () => {
  return (
    <Body>
      <Headline>
        <NavList />
        <Routes />
      </Headline>
    </Body>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
