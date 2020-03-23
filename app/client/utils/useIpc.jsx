import { ipcRenderer } from 'electron';
import { useState } from 'react';

const useIpc = (opt = {}) => {
  const [load, setLoad] = useState(false);

  const fetch = (route, args = null) => {
    // eslint-disable-next-line no-async-promise-executor
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
      return res.error ? reject(res.error) : resolve(res.data);
    });
  };

  return [fetch, load];
};

export default useIpc;
