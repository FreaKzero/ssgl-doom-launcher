import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavItem from './NavItem';
import routes from '#Root/routes';

const NavList = styled.ul`
  padding: 0;
  list-style: none;
  display: table;
  width: 600px;
  text-align: center;
`;

const Nav = () => {
  return (
    <NavList>
      {routes.map(route => <NavItem label={route.label} to={route.href} /> )}
    </NavList>
  );
};

export default Nav;
