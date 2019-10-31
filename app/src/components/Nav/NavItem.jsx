import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'wouter';
const NavItem = styled(({ label, to, active, ...rest }) => {
  return (
    <li {...rest}>
      <Link href={to}>{label}</Link>
    </li>
  );
})`
  display: table-cell;
  position: relative;
  padding: 15px 0;

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
    transition: all 0.3s ease 0s;
    width: 0;
  }
  a:hover {
    color: #ffa800;
    text-shadow: 0 -1px 4px #ff0000, 0 0px 10px #ff0000, 0 0px 20px #ff0000,
      0 0px 40px #ff0000;
  }
  a:hover:after {
    background-color: #ffa800;
    box-shadow: 0 -1px 4px #ff0000, 0 0px 10px #ff0000, 0 0px 20px #ff0000,
      0 0px 40px #ff0000;
    width: 100%;
    left: 0;
  }

  a.active {
    color: #ffa800;
    text-shadow: 0 -1px 4px #ff0000, 0 0px 10px #ff0000, 0 0px 20px #ff0000,
      0 0px 40px #ff0000;
  }
`;
export default NavItem;
