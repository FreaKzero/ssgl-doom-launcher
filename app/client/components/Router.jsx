import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route, Router } from 'wouter';

import routes from '#/routes';

// returns the current hash location (excluding the '#' symbol)
const currentLoc = () => window.location.hash.replace("#", "") || "/";

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLoc());

  useEffect(() => {
    const handler = () => setLoc(currentLoc());

    // subscribe on hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback(to => (window.location.hash = to), []);
  return [loc, navigate];
};

const ViewStyle = styled.div`
  margin: 15px;
`;

const Routes = () => {
  return (
    <ViewStyle>
      <Router hook={useHashLocation}>
        {routes.map(route => (
          <Route
            key={`route_${route.href}`}
            path={route.href}
            component={route.component}
          />
        ))}
      </Router>
    </ViewStyle>
  );
};

export default Routes;
