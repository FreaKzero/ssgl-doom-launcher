import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'wouter';
import NavItem from './NavItem';
import routes from '#Root/routes';
import { useTranslation } from '#Util/translation';

// TODO: key
const NavList = styled.ul`
  font-family: 'Michroma', sans-serif;
  padding: 0;
  list-style: none;
  display: table;
  width: 50%;
  font-size: 16px;
  padding: 20px 15px 0 0;
`;

const Nav = () => {
  const { t } = useTranslation('nav');
  const [location] = useLocation();
  return (
    <NavList>
      {routes.map(route => (
        <NavItem
          key={`rote_${route.href}_${route.label}`}
          active={route.href === location}
          to={route.href}
        >
          {t(route.label)}
        </NavItem>
      ))}
    </NavList>
  );
};

export default Nav;
