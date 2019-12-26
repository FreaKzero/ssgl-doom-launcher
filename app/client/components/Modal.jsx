import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';;
import BackDrop from './Backdrop';
import styles from '#Style';
import Button from './Form/Button';

const DialogMotion = ({ active, children, ...rest }) => {
  const variants = {
    anim: {
      opacity: 1,
      top: 30
    },
    init: { opacity: 0, top: -500 }
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

DialogMotion.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any
};

const Dialog = styled(DialogMotion)`
  background: ${styles.color.back};
  position: absolute;
  left: 15%;
  top: 40px;
  width: 65%;
  padding: 10px;
  border-radius: 4px;

  .buttons {
    text-align: right;
  }

  .content {
    min-height: 300px;

    & h1 {
      font-size: 16px;
      font-family: ${styles.font.head};
      text-transform: uppercase;
      color: #ffa800;
      text-shadow: 0 -1px 4px #ff0000, 0 0 15px #ff0000;
    }
  }
`;

const Modal = ({ children, active, setActive }) => {
  return (
    <>
      <BackDrop onClick={setActive} active={active} />
      <Dialog active={active}>
        <div className="content">{children}</div>
        <div className="buttons">
          <Button
            border={'#f55945'}
            glow={'#b8342a'}
            color={'#ff2f00'}
            onClick={setActive}
          >
            Cancel
          </Button>
          <Button>OK</Button>
        </div>
      </Dialog>
    </>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func.isRequired
};

export default Modal;
