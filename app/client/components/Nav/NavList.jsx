import React, { useContext } from 'react';
import { StoreContext } from '#State';
import styled from 'styled-components';
import { useLocation } from 'wouter';
import NavItem from './NavItem';
import routes from '#Root/routes';
import { useTranslation } from '#Util';
import styles from '#Style';

// TODO: key
const NavList = styled.ul`
  user-select: none;
  height: 65px;
  font-family: ${styles.font.head};
  list-style: none;
  display: table;
  width: 50%;
  font-size: 16px;
  padding: 15px 15px 0 0;
`;

const Nav = () => {
  const { gstate } = useContext(StoreContext);
  const { t } = useTranslation('nav');
  const [location] = useLocation();

  const r = routes.filter(item => {
    const { packages, mods, sourceports, settings } = gstate;
    const { label } = item;

    if (label === 'packages' && packages.length < 1) {
      return false;
    }
    if (label === 'wads' && mods.length < 1) {
      return false;
    }

    if (label === 'settings' && sourceports.length < 1 && !settings.modpath) {
      return false;
    }

    return true;
  });

  return (
    <NavList>
      {r.map(route => (
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
