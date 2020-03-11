import React from 'react';
import styled from 'styled-components';
import styles from '#Style';
import Logo from './Logo';
import { useTranslation } from '../utils';

const MainLoaderStyle = styled.div`
  font-family: ${styles.font.head};
  text-align: center;
  text-transform: uppercase;
  background-color: #1d2025;
  width: 100vw;
  height: 100vh;

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
