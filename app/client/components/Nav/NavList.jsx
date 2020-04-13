import React, { useContext } from 'react';
import styled from 'styled-components';

import routes from '#/routes';

import { StoreContext } from '../../state';
import { useTranslation } from '../../utils';
import NavItem from './NavItem';

// TODO: key
const NavList = styled.ul`
  user-select: none;
  height: 65px;
  font-family: ${({ theme }) => theme.font.head};
  list-style: none;
  display: table;
  width: 50%;
  font-size: 16px;
  padding: 15px 15px 0 0;
`;

const Nav = () => {
  const { gstate } = useContext(StoreContext);
  const { t } = useTranslation('nav');

  const r = routes.filter(item => {
    const { packages, mods, settings, sourceports } = gstate;
    const { label, hide } = item;

    if (hide) {
      return false;
    }

    if (label === 'packages' && packages.length < 1) {
      return false;
    }
    if (
      (label === 'wads' && mods.length < 1) ||
      (label === 'wads' && sourceports.length < 1)
    ) {
      return false;
    }

    if (label === 'sourceports' && settings.savepath === '') {
      return false;
    }

    return true;
  });

  return (
    <NavList>
      {r.map(route => {
        return (
          <NavItem key={`rote_${route.href}_${route.label}`} to={route.href}>
            {t(route.label)}
          </NavItem>
        );
      })}
    </NavList>
  );
};

export default Nav;
