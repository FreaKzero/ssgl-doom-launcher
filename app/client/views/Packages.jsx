import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '#State';
import { Box } from '#Component';
import { ButtonStyle } from '../components/Form/Button';
import { useTranslation, useIpc, setTitle } from '#Util';
import styles from '#Style';
import styled from 'styled-components';
import covers from '../assets/covers';

const Meta = styled.div`
  color: ${styles.color.meta};
  font-size: 14px;
  margin-bottom: 5px;
  text-shadow: 2 1px 1px black, 2 -1px -1px black;
  transition: ${styles.transition.out};
`;

const Button = styled(ButtonStyle)`
  display: inline;
  min-width: auto;
  width: 100px;
  padding: 3px 0 3px 0;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 33px;
  bottom: 10px;
`;

const PackageStyle = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 10px 10px 0;
  background-color: rgba(12, 8, 8, 0.8);
  background-image: ${p => `url(${p.cover});`};
  background-size: 100%;
  background-position: center top;
  background-repeat: no-repeat;
  border-radius: ${styles.border.radius};
  border: 1px solid ${styles.border.idle};
  user-select: none;
  width: 280px;
  height: 180px;
  transition: ${styles.transition.out};

  &:hover {
    background-size: 110%;
    border: 1px solid ${styles.border.active};
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

  &:hover div {
    color: white;
  }

  .content {
    width: 260px;
    height: 160px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease-out;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }
`;

const Pack = ({ pack }) => {
  setTitle('packages');
  const [ipc, loading] = useIpc();
  const { gstate, dispatch } = useContext(StoreContext);
  const { t } = useTranslation('packages');

  const onPlay = () => {
    ipc('sourceports/play', {
      ...pack
    });
  };

  const onDelete = async () => {
    const newPackages = gstate.packages.filter(item => item.id !== pack.id);
    const stuff = await ipc('packages/save', newPackages);
    dispatch({ type: 'packages/save', data: stuff });
  };

  const cover = pack.cover.isFile ? pack.cover.use : covers[pack.cover.use];

  return (
    <PackageStyle cover={cover}>
      <div className="content">
        <h1>{pack.name}</h1>
        <Meta>
          {pack.sourceport.name} - {pack.selected.length} Mods
        </Meta>

        <ButtonContainer>
          <Button type="submit" onClick={onPlay}>
            {t('play')}
          </Button>
          <Button
            type="button"
            border={'#f55945'}
            glow={'#b8342a'}
            color={'#ff2f00'}
            onClick={onDelete}
          >
            {t('delete')}
          </Button>
        </ButtonContainer>
      </div>
    </PackageStyle>
  );
};

const Packages = () => {
  const { gstate, dispatch } = useContext(StoreContext);
  return (
    <Box>
      {gstate.packages.map(pack => (
        <Pack pack={pack} />
      ))}
    </Box>
  );
};
export default Packages;
