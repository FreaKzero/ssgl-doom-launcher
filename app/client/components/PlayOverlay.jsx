import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StoreContext } from '#State';
import IWad from './IWad';
import Dropdown from './Form/Dropdown';
import BackDrop from './Backdrop';
import styles from '#Style';
import { useIpc } from '#Util';

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
  const { gstate, dispatch } = useContext(StoreContext);
  const [sourceport, setSourceport] = useState();
  const [ipc] = useIpc();

  const options = gstate.sourceports.map(item => ({
    label: item.name,
    value: item.id
  }));

  useEffect(() => {
    if (gstate.package.sourceport !== null) {
      setSourceport(gstate.package.sourceport.id);
    } else if (gstate.settings.defaultsourceport) {
      setSourceport(gstate.settings.defaultsourceport);
    } else if (gstate.sourceports[0]) {
      setSourceport(gstate.sourceports[0].id);
    }
  }, [gstate]);

  const onSourceport = ({ value }) => {
    setSourceport(value);
  };

  const onPlay = iwad => async () => {
    const useSourceport = gstate.sourceports.find(i => i.id === sourceport);

    const newPackages = await ipc('sourceports/play', {
      ...gstate.package,
      sourceport: useSourceport,
      iwad
    });

    dispatch({
      type: 'packages/save',
      packages: newPackages,
      package: gstate.package
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
