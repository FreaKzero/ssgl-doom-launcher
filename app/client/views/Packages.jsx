import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '#Component';
import { ButtonStyle } from '../components/Form/Button';

import styles from '#Style';
import styled from 'styled-components';
import covers from '../assets/covers';

const Button = styled(ButtonStyle)`
  min-width: auto;
  width: 100%;
  padding: 3px 0 3px 0;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  margin-top: 70%;
`;

const pack = [
  {
    id: 'someid',
    name: 'Trailblazer',
    wads: ['one', 'two', 'three'],
    sourceport: 'someid',
    cover: '',
    iwad: 'doom2'
  }
];

/*
const PackageStyle = styled.div`
  display: inline-block;
  margin: 0 10px 10px 0;
  background-color: rgba(12, 8, 8, 0.8);
  background-image: url(${covers['doom2']});
  background-size: 80%;
  background-position: center 20px;
  background-repeat: no-repeat;
  border-radius: ${styles.border.radius};
  padding: 10px;
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  user-select: none;
  cursor: pointer;
  width: 140px;
  height: 190px;
  */
const PackageStyle = styled.div`
  display: inline-block;
  margin: 0 10px 10px 0;
  background-color: rgba(12, 8, 8, 0.8);
  background-image: ${p => `url(${covers[p.cover]});`};
  background-size: contain;
  background-position: center top;
  background-repeat: no-repeat;
  border-radius: ${styles.border.radius};
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  user-select: none;
  cursor: pointer;
  width: 160px;

  .content {
    width: 140px;
    height: 190px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
  }

  & h1 {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    transition: ${styles.transition.out};
    text-transform: uppercase;
  }

  &:hover h1 {
    color: ${styles.color.active};
  }

  &:hover {
    border: 1px solid ${styles.border.active};
  }
`;

const Pack = ({ cover }) => {
  return (
    <PackageStyle cover={cover}>
      <div className="content">
        <h1>asdfasdf</h1>

        <ButtonContainer>
          <Button type="submit" width="200px">
            Use
          </Button>
          <Button type="submit" width="200px">
            Play now
          </Button>
        </ButtonContainer>
      </div>
    </PackageStyle>
  );
};
const Packages = () => {
  return (
    <Box>
      <Pack cover={'heretic'} />
      <Pack cover={'chex2'} />
      <Pack cover={'hexdd'} />
      <Pack cover={'freedoom1'} />
      <Pack cover={'doom'} />
      <Pack cover={'freedoom2'} />
      <Pack cover={'strife0'} />
      <Pack cover={'chex'} />
      <Pack cover={'tnt'} />
      <Pack cover={'hacx'} />
      <Pack cover={'strife1'} />
      <Pack cover={'hexen'} />
      <Pack cover={'doom64'} />
      <Pack cover={'doom2'} />
      <Pack cover={'heretic1'} />
      <Pack cover={'plutonia'} />
      <Pack cover={'freedm'} />
    </Box>
  );
};
export default Packages;
