import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { useHashLocation } from '../../utils';

const NavItemStyle = styled.li`
  display: table-cell;
  position: relative;

  a {
    color: ${({ theme }) => theme.color.idle};
    transition: ${({ theme }) => theme.transition.short};
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    padding: 15px 20px;
    position: relative;
  }

  a::after {
    color: ${({ theme }) => theme.color.active};
    transition: ${({ theme }) => theme.transition.short};
    bottom: 0;
    content: '';
    display: block;
    height: 5px;
    left: 50%;
    position: absolute;
    width: 0;
  }

  a:hover,
  a.active {
    color: ${({ theme }) => theme.color.active};
    text-shadow: ${({ theme }) => theme.font.glow};
  }

  a:hover::after {
    background-color: ${({ theme }) => theme.color.active};
    box-shadow: ${({ theme }) => theme.font.glow};
    width: 100%;
    left: 0;
  }
`;

/*
  We have to do it that way because of the hashrouter - <Link> doesnt recognize the hashs
*/
const NavItem = ({ children, to }) => {
  const [location] = useHashLocation();
  return (
    <NavItemStyle>
      <a className={location === to ? 'active' : undefined} href={'#' + to}>
        {children}
      </a>
    </NavItemStyle>
  );
};

NavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  to: PropTypes.string.isRequired
};

export default NavItem;
