import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import ToastContext from './ToastContext';

let currentTimeout;

const DEFAULT_TOAST_DURATION = 2400;

const scopeStyle = scope => {
  switch (scope) {
    case 'danger':
      return `
        color: #ff2f00;
        text-shadow: 0 -1px 4px #b8342a, 0 0px 15px #b8342a;
        `;
    default:
      return `
        color: #ffa800;
        text-shadow: 0 -1px 4px #ff0000, 0 0px 15px #ff0000;
      `;
  }
};

const Indicator = styled.div`
  background-color: ${({ theme }) => theme.color.active};
  box-shadow: ${({ theme }) => theme.font.glow};
  animation: toasttimer ${DEFAULT_TOAST_DURATION}ms;
`;

const ToastPortalStyle = styled.div`
  position: absolute;
  top: 5px;
  left: calc(50% - 200px);
  pointer-events: none;
`;

const ToastStyle = styled.div`
  background: #1d2025;
  border: 1px solid #1d2226;
  border-radius: ${({ theme }) => theme.border.radius};
  width: 400px;
  padding: 15px;
  color: white;
  margin-bottom: 5px;

  p {
    margin: 8px 0 8px 0;
    font-family: ${({ theme }) => theme.font.content};
  }

  h1 {
    font-size: 16px;
    font-family: ${({ theme }) => theme.font.head};
    text-transform: uppercase;
    ${p => scopeStyle(p.scope)}
  }
`;

const ToastMotion = ({ toast }) => {
  const variants = {
    init: {
      marginTop: -1,
      opacity: 1
    },
    exit: {
      marginTop: -100,
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
        <Indicator />
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
  const [toasts, setToasts] = useState([]);

  const addToast = (scope, title, text) => {
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
