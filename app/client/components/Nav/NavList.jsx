import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'wouter';
import NavItem from './NavItem';
import routes from '#Root/routes';
import { useTranslation } from '#Util';
import styles from '#Style';

// TODO: key
const NavList = styled.ul`
  height: 65px;
  font-family: ${styles.font.head};
  padding: 0;
  list-style: none;
  display: table;
  width: 50%;
  font-size: 16px;
  padding: 15px 15px 0 0;
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
