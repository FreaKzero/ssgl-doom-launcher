import React from 'react';
import Logo from '#Component/Logo';
import NavList from '#Component/Nav/NavList';
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
