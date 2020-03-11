import React from 'react';
import Logo from './Logo';
import NavList from './Nav/NavList';
import styled from 'styled-components';

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
