import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import styles from '#Style';
import { motion, AnimatePresence } from 'framer-motion';
import ToastContext from './ToastContext';

let currentTimeout;

const DEFAULT_TOAST_DURATION = 4000;

const scopeStyle = scope => {
  switch (scope) {
    case 'info':
      return `
        color: #ffa800;
        text-shadow: 0 -1px 4px #ff0000, 0 0px 15px #ff0000;
      `;
    case 'danger':
      return `
        color: #ff2f00;
        text-shadow: 0 -1px 4px #b8342a, 0 0px 15px #b8342a;
        `;

    case 'ok':
      return `
      color: #0dff00;
      text-shadow: 0 -1px 4px #2ab878, 0 0px 15px #2ab878;
      `;
  }
};

const ToastPortalStyle = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  pointer-events: none;
`;

const ToastStyle = styled.div`
  background: linear-gradient(180deg, #3f464c 0%, #1d2025 100%);
  border: 1px solid #1d2226;
  border-radius: ${styles.border.radius};
  min-width: 250px;
  padding: 15px;
  color: white;
  margin-bottom: 5px;

  p {
    margin-top: 10px;
    font-family: ${styles.font.content};
  }

  h1 {
    font-size: 14px;
    font-family: ${styles.font.head};
    text-transform: uppercase;
    ${p => scopeStyle(p.scope)}
  }
`;

const ToastMotion = ({ toast }) => {
  const variants = {
    init: {
      opacity: 1,
      left: 0,
      scale: 1
    },
    exit: {
      scale: 0,
      opacity: 0
    }
  };
  return (
    <motion.div
      variants={variants}
      transition={{ type: 'tween' }}
      initial="exit"
      animate="init"
      exit={'exit'}
    >
      <ToastStyle scope={toast.scope}>
        <h1>{toast.title}</h1>
        {toast.text ? <p>{toast.text}</p> : null}
      </ToastStyle>
    </motion.div>
  );
};

ToastMotion.propTypes = {
  toast: PropTypes.shape({
    scope: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
};

const ToastContainer = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (title, scope = 'info', text) => {
    setToasts([{ title, scope, text }, ...toasts]);

    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    currentTimeout = setTimeout(() => {
      setToasts([]);
    }, DEFAULT_TOAST_DURATION);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {createPortal(
        <ToastPortalStyle>
          <AnimatePresence>
            {toasts.map((t, i) => (
              <ToastMotion key={`toast_${i}`} toast={t} />
            ))}
          </AnimatePresence>
        </ToastPortalStyle>,
        document.body
      )}
      {children}
    </ToastContext.Provider>
  );
};

ToastContainer.propTypes = {
  children: PropTypes.any
};

export default ToastContainer;
