import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { StoreContext } from '../../state';
import AudioContext from './AudioContext';

const AudioProvider = ({ children }) => {
  const { gstate } = useContext(StoreContext);

  const play = name => {
    if (gstate.settings[name] && gstate.settings[name].trim() !== '') {
      try {
        const a = new Audio(`file://${gstate.settings[name]}`);
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
