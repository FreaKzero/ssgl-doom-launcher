import React from 'react';
import { Route } from 'wouter';
import routes from '#Root/routes';

const Routes = () => {
  return (
    <>
      {routes.map(route => (
        <Route
          key={`route_${route.href}`}
          path={route.href}
          component={route.component}
        />
      ))}
    </>
  );
};

export default Routes;
