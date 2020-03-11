import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import NavList from './Nav/NavList';

const Head = styled(({ ...rest }) => {
  return (
    <div {...rest}>
      <Logo />
      <NavList />
    </div>
  );
})`
  display: flex;
`;

export default Head;
