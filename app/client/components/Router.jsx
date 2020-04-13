import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import styled from 'styled-components';
import { Route, Router } from 'wouter';

import routes from '#/routes';

import { useHashLocation } from '../utils';

const ViewStyle = styled.div`
  margin: 15px;
`;

const Routes = () => {
  // eslint-disable-next-line no-unused-vars
  const [loc, navigate] = useHashLocation();
  return (
    <ViewStyle>
      <Router hook={useHashLocation}>
        {routes.map(route => {
          if (route.shortcut && route.shortcut.trim() !== '') {
            useHotkeys(route.shortcut, () => navigate(route.href));
          }

          return (
            <Route
              key={`route_${route.href}`}
              path={route.href}
              component={route.component}
            />
          );
        })}
      </Router>
    </ViewStyle>
  );
};

export default Routes;
