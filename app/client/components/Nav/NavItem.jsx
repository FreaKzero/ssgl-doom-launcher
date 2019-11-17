import React from 'react';
import styled from 'styled-components';
import { Link } from 'wouter';
const NavItem = styled(({ children, to, active, ...rest }) => {
  return (
    <li {...rest}>
      <Link className={active ? 'active' : undefined} href={to}>
        {children}
      </Link>
    </li>
  );
})`
  display: table-cell;
  position: relative;

  a {
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    padding: 15px 20px;
    position: relative;
    transition: all 0.3s ease;
  }
  a:after {
    bottom: 0;
    content: '';
    display: block;
    height: 5px;
    left: 50%;
    position: absolute;
    background: #fff;
    transition: all 0.3s ease;
    width: 0;
  }
  a:hover {
    color: #ffa800;
    text-shadow: 0 -1px 4px #ff0000, 0 0px 15px #ff0000;
  }
  a:hover:after {
    background-color: #ffa800;
    box-shadow: 0 -1px 4px #ff0000, 0 0px 15px #ff0000;
    width: 100%;
    left: 0;
  }

  a.active {
    color: #ffa800;
    text-shadow: 0 -1px 4px #ff0000, 0 0px 15px #ff0000;
  }
`;
export default NavItem;
