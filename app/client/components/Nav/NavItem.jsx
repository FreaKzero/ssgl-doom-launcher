import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import { Link } from 'wouter';

const NavItemStyle = styled.li`
  display: table-cell;
  position: relative;

  a {
    color: ${styles.color.idle};
    transition: ${styles.transition.short};
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    padding: 15px 20px;
    position: relative;
  }

  a::after {
    background: ${styles.color.idle};
    transition: ${styles.transition.short};
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
    color: ${styles.color.active};
    text-shadow: ${styles.font.glow};
  }

  a:hover::after {
    background-color: ${styles.color.active};
    box-shadow: ${styles.font.glow};
    width: 100%;
    left: 0;
  }
`;

const NavItem = ({ children, to, active }) => {
  return (
    <NavItemStyle>
      <Link className={active ? 'active' : undefined} href={to}>
        {children}
      </Link>
    </NavItemStyle>
  );
};

NavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  to: PropTypes.string.isRequired
};

export default NavItem;
