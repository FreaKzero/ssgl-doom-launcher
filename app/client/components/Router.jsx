import React from 'react';
import { Route } from 'wouter';
import styled from 'styled-components';
import routes from '#Root/routes';

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
