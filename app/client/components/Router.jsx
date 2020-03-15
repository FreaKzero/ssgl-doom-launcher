import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route, Router } from 'wouter';

import routes from '#/routes';

import { useHashLocation } from '../utils';

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
