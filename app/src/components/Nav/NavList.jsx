import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavItem from './NavItem';
import routes from '#Root/routes';
import { useTranslation } from '#Util/translation';

// TODO: key
const NavList = styled.ul`
  padding: 0;
  list-style: none;
  display: table;
  width: 100%;
  text-align: right;
`;

const Nav = () => {
  const { t } = useTranslation('nav');
  return (
    <NavList>
      {routes.map(route => (
        <NavItem to={route.href}>{t(route.label)}</NavItem>
      ))}
    </NavList>
  );
};

export default Nav;
