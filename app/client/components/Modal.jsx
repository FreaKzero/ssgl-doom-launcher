import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import styles from '#Style';

import { useTranslation } from '../utils';
import BackDrop from './Backdrop';
import Button from './Form/Button';

const DialogMotion = ({ children, ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, top: -300 }}
      animate={{
        opacity: 1,
        top: 30
      }}
      exit={{ opacity: 0, top: -300 }}
      transition={{ type: 'tween' }}
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
  font-family: ${styles.font.content};
  background: ${styles.color.back};
  position: absolute;
  left: 15%;
  top: 40px;
  width: 65%;
  padding: 15px;
  border-radius: 4px;

  .buttons {
    text-align: right;
  }

  .content {
    min-height: 200px;

    & h1 {
      font-size: 16px;
      font-family: ${styles.font.head};
      text-transform: uppercase;
      color: #ffa800;
      text-shadow: 0 -1px 4px #ff0000, 0 0 15px #ff0000;
      margin-bottom: 15px;
    }
  }
`;

const Modal = ({ children, active, setActive, onOk, onCancel }) => {
  const { t } = useTranslation('common');

  const onOkWrapper = e => {
    onOk(e);
    setActive(false);
  };

  const onCancelWrapper = e => {
    onCancel(e);
    setActive(false);
  };

  return active
    ? createPortal(
        <>
          <BackDrop onClick={onCancelWrapper} active={active} />
          <AnimatePresence>
            <Dialog active={active}>
              <div className="content">{children}</div>
              <div className="buttons">
                <Button
                  type="button"
                  border={'#f55945'}
                  glow={'#b8342a'}
                  color={'#ff2f00'}
                  onClick={onCancelWrapper}
                  width="100px"
                >
                  {t('cancel')}
                </Button>
                <Button
                  style={{ margin: 0 }}
                  width="100px"
                  type="button"
                  onClick={onOkWrapper}
                >
                  {t('ok')}
                </Button>
              </div>
            </Dialog>
          </AnimatePresence>
        </>,
        document.body
      )
    : null;
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func.isRequired
};

export default Modal;
