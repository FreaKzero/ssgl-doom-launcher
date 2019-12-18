import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreContext } from '#State';
import { ipcRenderer } from 'electron';
import IWad from '#Component/IWad';
import Dropdown from '../Form/Dropdown';

const BackdropMotion = ({ active, children, ...rest }) => {
  const variants = {
    anim: {
      height: `100vh`
    },
    init: {
      height: 0
    }
  };

  return (
    <motion.div
      variants={variants}
      transition={{ type: 'tween' }}
      initial="init"
      animate={active ? 'anim' : 'init'}
      exit={{ height: 0 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const ModalMotion = ({ active, children, ...rest }) => {
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

const Modal = styled(ModalMotion)`
  backdrop-filter: blur(5px);
  height: 200px;
  background: rgba(12, 8, 8, 0.9);
  position: absolute;
  left: 0;
  padding: 20px;
  width: calc(100vw - 40px);
  border-top: 0px;
`;

const BackDrop = styled(BackdropMotion)`
  color: red;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
`;

const PlayOverlay = ({ active, setActive }) => {
  const { gstate, dispatch } = React.useContext(StoreContext);
  const [sourceport, setSourceport] = React.useState(
    gstate.settings.defaultsourceport
  );

  const options = gstate.sourceports.map(item => ({
    label: item.name,
    value: item.id
  }));

  const onSourceport = ({ value }) => {
    setSourceport(value);
  };

  const onPlay = iwad => () => {
    const useSourceport = gstate.sourceports.find(i => i.id === sourceport);
    ipcRenderer.invoke('sourceports/play', {
      selected: gstate.selected,
      iwad: iwad,
      sourceport: useSourceport
    });
    setActive(false);
  };

  return (
    <>
      <BackDrop onClick={() => setActive(false)} active={active} />
      <Modal active={active}>
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
                onClick={onPlay(item.path)}
              />
            ))}
        </IWad.List>
      </Modal>
    </>
  );
};

export default PlayOverlay;
