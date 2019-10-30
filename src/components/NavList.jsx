import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import background from '#Assets/doom.png';

const Style = styled.div`
  ul {
    padding: 0;
    list-style: none;
    display: table;
    width: 600px;
    text-align: center;
  }
  li {
    display: table-cell;
    position: relative;
    padding: 15px 0;
  }
  a {
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;

    display: inline-block;
    padding: 15px 20px;
    position: relative;
  }
  a:after {
    bottom: 0;
    content: '';
    display: block;
    height: 5px;
    left: 50%;
    position: absolute;
    background: #fff;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
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
`;

const NavList = () => {
  return (
    <Style>
      <ul>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Portfolio</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </Style>
  );
};

export default NavList;
