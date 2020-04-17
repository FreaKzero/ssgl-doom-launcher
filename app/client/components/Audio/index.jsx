import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import click from '../../assets/sounds/click.ogg';
import { StoreContext } from '../../state';
import AudioContext from './AudioContext';

const AudioProvider = ({ children }) => {
  const { gstate } = useContext(StoreContext);
  const play = name => {
    const DEFAULTS = {
      soundStart: click,
      soundDrawer: click,
      soundModSelect: click,
      soundToastSuccess: click,
      soundToastError: click
    };

    if (!gstate.settings.soundActive) {
      return;
    }

    if (gstate.settings[name] && gstate.settings[name].trim() !== '') {
      try {
        const a = new Audio(`file://${gstate.settings[name]}`);
        a.volume = gstate.settings.volume;
        a.play();
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const a = new Audio(DEFAULTS[name]);
        a.volume = gstate.settings.volume;
        a.play();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <AudioContext.Provider value={{ play }}>{children}</AudioContext.Provider>
  );
};

AudioProvider.propTypes = {
  children: PropTypes.any
};

export default AudioProvider;
