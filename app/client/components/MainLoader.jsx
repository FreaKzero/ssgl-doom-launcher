import React from 'react';
import styled from 'styled-components';
import styles from '#Style';
import Logo from './Logo';
import { useTranslation } from '#Util/translation';

const MainLoaderStyle = styled.div`
  font-family: 'Rajdhani', sans-serif;
  text-align: center;
  text-transform: uppercase;
  background-color: black;
  width: 100vw;
  height: 100vh;

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @keyframes breathe {
    0% {
      text-shadow: 0 -1px 4px #ff0000, 0 0px 15px #ff0000, 0 0px 30px #ff0000;
      opacity: 1;
    }
    50% {
      text-shadow: none;
      opacity: 0.3;
    }
    100% {
      text-shadow: 0 -1px 4px #ff0000, 0 0px 15px #ff0000, 0 0px 30px #ff0000;
      opacity: 1;
    }
  }

  h1 {
    color: #ffa800;
    font-size: 35px;
    animation-iteration-count: infinite;
    animation-name: breathe;
    animation-duration: 1.5s;
    animation-timing-function: ease-in, ease-in-out;
  }
`;

const MainLoader = () => {
  const { t } = useTranslation('common');
  return (
    <MainLoaderStyle>
      <div className="content">
        <Logo height="250" />
        <h1>{t('loading')}</h1>
      </div>
    </MainLoaderStyle>
  );
};

export default MainLoader;
