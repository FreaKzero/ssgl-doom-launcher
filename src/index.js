import React from 'react';
import ReactDOM from 'react-dom';
import Headline from '#Components/Headline';
import Body from '#Components/Body';
import NavList from '#Components/NavList';
import './assets/base.css';

const title = 'React with Webpack and Babel';
const wat = 'deine mudda';

const App = () => {
  return (
    <Body>
      <Headline>
        <NavList />
      </Headline>
    </Body>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
