import React from 'react';
import svgLogo from '#Asset/Logo.svg';
import SVG from 'react-svg-inline';
import styled from 'styled-components';

const LogoContainer = styled.div`
  padding: 20px 0 0 20px;
  width: 100%;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <SVG height="60" svg={svgLogo} />
    </LogoContainer>
  );
};

export default Logo;
