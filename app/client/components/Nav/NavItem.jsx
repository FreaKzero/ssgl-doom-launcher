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
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    padding: 15px 20px;
    position: relative;
    transition: ${styles.transition.short};
  }

  a::after {
    bottom: 0;
    content: '';
    display: block;
    height: 5px;
    left: 50%;
    position: absolute;
    background: ${styles.color.idle};
    transition: ${styles.transition.short};
    width: 0;
  }

  a:hover,
  a.active {
    color: ${styles.color.active};
    text-shadow: 0 -1px 4px #ff0000, 0 0 15px #ff0000;
  }

  a:hover::after {
    background-color: ${styles.color.active};
    box-shadow: 0 -1px 4px #ff0000, 0 0 15px #ff0000;
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
