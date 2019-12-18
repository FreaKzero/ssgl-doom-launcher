import React from 'react';
import { ipcRenderer } from 'electron';

const useIpc = (opt = {}) => {
  const [load, setLoad] = React.useState(false);

  const fetch = (route, args = null) => {
    return new Promise(async (resolve, reject) => {
      setLoad(true);
      const res = await ipcRenderer.invoke(route, args);

      if (opt.delayLoad) {
        setTimeout(() => {
          setLoad(false);
        }, opt.delayLoad);
      } else {
        setLoad(false);
      }

      return res.error ? reject(new Error(res.error)) : resolve(res.data);
    });
  };

  return [fetch, load];
};

export default useIpc;
