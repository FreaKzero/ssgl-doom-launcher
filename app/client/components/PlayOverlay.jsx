import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StoreContext } from '#State';
import { ipcRenderer } from 'electron';
import IWad from './IWad';
import Dropdown from './Form/Dropdown';
import BackDrop from './Backdrop';
import styles from '#Style';

const DrawerMotion = ({ active, children, ...rest }) => {
  const variants = {
    anim: {
      bottom: `0px`,
      opacity: 1
    },
    init: { bottom: `-200px`, opacity: 0 }
  };
  return (
    <motion.div
      variants={variants}
      transition={{ type: 'tween' }}
      initial="init"
      animate={active ? 'anim' : 'init'}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

DrawerMotion.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any
};

const Drawer = styled(DrawerMotion)`
  background: ${styles.color.backdrop};
  backdrop-filter: blur(5px);
  height: 200px;
  position: absolute;
  left: 0;
  padding: 20px;
  width: calc(100vw - 40px);
  border-top: 0;
`;

const PlayOverlay = ({ active, setActive }) => {
  const { gstate } = React.useContext(StoreContext);
  const [sourceport, setSourceport] = React.useState();

  const options = gstate.sourceports.map(item => ({
    label: item.name,
    value: item.id
  }));

  useEffect(() => {
    gstate.package.sourceport !== null
      ? setSourceport(gstate.package.sourceport.id)
      : setSourceport(gstate.settings.defaultsourceport);
  }, [gstate]);

  const onSourceport = ({ value }) => {
    setSourceport(value);
  };

  const onPlay = iwad => () => {
    const useSourceport = gstate.sourceports.find(i => i.id === sourceport);

    ipcRenderer.invoke('sourceports/play', {
      ...gstate.package,
      sourceport: useSourceport,
      iwad
    });

    setActive(false);
  };

  return (
    <>
      <BackDrop onClick={() => setActive(false)} active={active} />
      <Drawer active={active}>
        <Dropdown
          name="language"
          options={options}
          label={'Sourceport'}
          onChange={onSourceport}
          value={sourceport}
        />
        <IWad.List>
          {gstate.iwads.length &&
            gstate.iwads.map(item => (
              <IWad.Item
                name={item.name}
                key={item.id}
                onClick={onPlay(item)}
              />
            ))}
        </IWad.List>
      </Drawer>
    </>
  );
};

PlayOverlay.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func.isRequired
};

export default PlayOverlay;
