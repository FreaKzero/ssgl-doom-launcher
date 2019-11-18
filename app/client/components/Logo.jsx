import React from 'react';
import svgLogo from '#Asset/Logo.svg';
import SVG from 'react-svg-inline';
import styled from 'styled-components';

const LogoContainer = styled.div`
  padding: 10px 0 0 10px;
  width: 100%;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <SVG height="70" svg={svgLogo} />
    </LogoContainer>
  );
};

export default Logo;
