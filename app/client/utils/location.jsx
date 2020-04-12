import { useCallback, useEffect, useState } from 'react';

let refer = '/';

export const currentLocation = () =>
  window.location.hash.replace('#', '') || '/';

export const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    const handler = () => setLoc(currentLocation());

    // subscribe on hash changes
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = useCallback(to => {
    refer = currentLocation();
    return (window.location.hash = to);
  }, []);
  return [loc, navigate, refer];
};
