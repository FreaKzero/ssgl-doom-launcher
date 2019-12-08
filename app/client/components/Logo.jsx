import React from 'react';
import svgLogo from '#Asset/Logo.svg';
import SVG from 'react-svg-inline';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LogoContainer = styled.div`
  padding: 10px 0 0 10px;
  width: 100%;
`;

const Logo = ({ height = '70' }) => {
  return (
    <LogoContainer>
      <SVG height={height} svg={svgLogo} />
    </LogoContainer>
  );
};

export default Logo;
