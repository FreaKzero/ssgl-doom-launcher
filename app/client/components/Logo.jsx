import React from 'react';
import PropTypes from 'prop-types';
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
      <SVG height="80" svg={svgLogo} />
    </LogoContainer>
  );
};

export default Logo;
