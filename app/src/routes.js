import React from 'react';
import { T } from '#Util/translation';
import Box from '#Component/Box';

const Test = () => {
  return (
    <div>
      <Box />
    </div>
  );
};

const Test2 = () => {
  return <div>Test2!</div>;
};

const routes = [
  {
    label: 'WADS',
    href: '/test',
    component: Test
  }
];

export default routes;
