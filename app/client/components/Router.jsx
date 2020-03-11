import React from 'react';
import styled from 'styled-components';
import { Route } from 'wouter';

import routes from '#/routes';

const ViewStyle = styled.div`
  margin: 15px;
`;

const Routes = () => {
  return (
    <ViewStyle>
      {routes.map(route => (
        <Route
          key={`route_${route.href}`}
          path={route.href}
          component={route.component}
        />
      ))}
    </ViewStyle>
  );
};

export default Routes;
