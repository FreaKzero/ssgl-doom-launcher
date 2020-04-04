import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';

import folderSvg from '../../assets/icon/folder.svg';
import playSvg from '../../assets/icon/play.svg';
import randSvg from '../../assets/icon/rand.svg';
import useSvg from '../../assets/icon/use.svg';
import covers from '../../assets/ssgl-iwad-covers';
import { IconButton } from '../../components/Form';
import Icon from '../../components/Mods/Icon';
import { StoreContext } from '../../state';
import { image, setTitle, useTranslation } from '../../utils';

const Package = motion.custom(styled.div`
  display: inline-block;
  position: relative;
  margin: 0 10px 10px 0;
  background-color: rgba(12, 8, 8, 0.8);
  background-image: ${p => `url("${image(p.cover)}");`};
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid ${({ theme }) => theme.border.idle};
  user-select: none;
  width: 240px;
  height: 160px;
  overflow: hidden;

  &:hover {
    transition: ${({ theme }) => theme.transition.out};
    background-size: 116%;
    border: 1px solid ${({ theme }) => theme.border.active};
  }

  & h1 {
    display: block;
    width: 240px;
    font-size: 18px;
    margin-bottom: 5px;
    transition: ${({ theme }) => theme.transition.out};
    text-transform: uppercase;
  }

  &:hover h1 {
    color: ${({ theme }) => theme.color.active};
  }

  .delete {
    transition: all 0.2s ease-out;
    position: absolute;
    right: 10px;
    top: 10px;
    transform: scale(0);
    transform-origin: center center;
  }

  &:hover .delete {
    transform: scale(1);
  }

  .content {
    width: 260px;
    height: 160px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-out;

    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .buttonContainer {
    width: 95%;
    position: absolute;
    left: 10px;
    bottom: -40px;
    text-align: center;
    transition: all 0.3s ease-out;
  }

  &:hover .buttonContainer {
    bottom: 10px;
  }

  .meta {
    color: white;
    font-size: 14px;
    margin-bottom: 5px;
    text-shadow: 2 1px 1px black, 2 -1px -1px black;
    transition: ${({ theme }) => theme.transition.out};
    opacity: 0;
    margin-top: 15px;
  }

  &:hover .meta {
    opacity: 1;
    margin-top: 0;
  }
`);

const Pack = ({ pack, onUse, onData, onPlay, onDelete, onOblige }) => {
  setTitle('packages');
  const { gstate } = useContext(StoreContext);
  const { t } = useTranslation(['packages', 'common']);

  const cover = pack.cover.isFile ? pack.cover.use : covers[pack.cover.use];
  const sourceport = gstate.sourceports.find(i => i.id === pack.sourceport);

  return (
    <Package
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1
      }}
      exit={{ opacity: 0 }}
      positionTransition={{ type: 'tween' }}
      cover={cover}
    >
      <div className="content">
        <div className="delete">
          <Icon
            stroke="white"
            name="times"
            width="17"
            onClick={onDelete(pack.id)}
            danger
          />
        </div>
        <h1>{pack.name}</h1>
        <div className="meta">
          {sourceport.name} - {pack.selected.length} Mods <br />
          {pack.lastplayed === 0
            ? t('packages:never')
            : t('packages:lastplayed', { value: pack.lastplayed })}
        </div>

        <div className="buttonContainer">
          <IconButton svg={playSvg} onClick={onPlay(pack, sourceport)} />
          {gstate.settings.obligeActive ? (
            <IconButton svg={randSvg} onClick={onOblige} />
          ) : null}
          <IconButton svg={useSvg} onClick={onUse(pack.id)} />
          <IconButton svg={folderSvg} onClick={onData(pack.datapath)} />
        </div>
      </div>
    </Package>
  );
};

Pack.propTypes = {
  onDelete: PropTypes.func.isRequired,
  pack: PropTypes.any.isRequired,
  style: PropTypes.any,
  onUse: PropTypes.func.isRequired,
  onData: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onOblige: PropTypes.func.isRequired
};

export default Pack;
