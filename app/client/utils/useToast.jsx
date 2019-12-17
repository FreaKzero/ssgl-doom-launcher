import React, { useContext } from 'react';
import ToastContext from '../components/Toast/ToastContext';

function useToast() {
  const ctx = useContext(ToastContext);
  return [ctx.addToast, ctx.toasts];
}

export default useToast;
