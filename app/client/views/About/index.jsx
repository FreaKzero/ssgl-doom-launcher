import { remote } from 'electron';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { BoxStyle } from '../../components/Box';
import Flex from '../../components/Flex';
import Logo from '../../components/Logo';
import AnimatedView from '../AnimatedView';
import { contact, techs, testers } from './data';

// backdrop:
const Box = styled(BoxStyle)`
  background: rgba(0, 0, 0, 0.7);
`;

const Text = styled.div`
  h1 {
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
  }

  h2 {
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .link {
    color: ${({ theme }) => theme.color.active};
    transition: ${({ theme }) => theme.transition.out};
    cursor: pointer;

    & .meta {
      font-size: 14px;
      opacity: 0.6;
    }

    &:hover {
      color: white;
    }
  }

  ul {
    color: red;
    list-style-type: square;
    padding-left: 20px;
    margin: 10px;
    margin-bottom: 30px;
  }

  li {
    margin-bottom: 5px;
  }
`;

const Link = ({ children, to }) => {
  const onClick = () => remote.shell.openExternal(to);
  return (
    <span onClick={onClick} className="link">
      {children}
    </span>
  );
};

Link.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string
};

const About = () => {
  return (
    <AnimatedView>
      <Box>
        <Text>
          <h1>
            SSGL (Super Shotgun Launcher) Version {remote.app.getVersion()}
          </h1>
          <Logo height="90px" center />
          <br /> <br />
          <Flex.Grid>
            <Flex.Col>
              <h3>Used Technologies</h3>
              <ul>
                {techs.map(i => (
                  <li key={i.name}>
                    <Link to={i.link}>{i.name}</Link>
                  </li>
                ))}
              </ul>
            </Flex.Col>
            <Flex.Col>
              <h3>Shoutout to my Alphatesters</h3>
              <ul>
                {testers.map(i => (
                  <li key={i.name}>
                    <Link to={i.link}>
                      {i.name} <br />
                      <span className="meta">{i.role}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Flex.Col>
            <Flex.Col>
              <h3>If you want to Contact me</h3>
              <ul>
                {contact.map(i => (
                  <li key={i.platform}>
                    <Link to={i.link}>{i.platform}</Link>
                  </li>
                ))}
              </ul>
            </Flex.Col>
          </Flex.Grid>
          <p style={{ textAlign: 'center', marginBottom: '15px' }}>
            DOOM is a registered Trademark of id Software LLC, a Zenimax Media
            company in the US and/or other Countries, and is used without
            permission. All other Trademarks are the property of their
            respective holders. SSGL is in no way affiliated with nor endorsed
            by id Software.
          </p>
          <p style={{ textAlign: 'center', textTransform: 'uppercase' }}>
            Licensed under MIT License <br />
            Copyright (c) 2015 Thomas Petrovic
          </p>
          <p style={{ textAlign: 'right' }}>Handcrafted in Vienna, Austria</p>
        </Text>
      </Box>
    </AnimatedView>
  );
};
export default About;
