import PropTypes from 'prop-types';
import React from 'react';
import SvgInline from 'react-svg-inline';
import styled from 'styled-components';

import circle from '#/assets/icon/circle.svg';
import down from '#/assets/icon/down.svg';
import times from '#/assets/icon/times.svg';
import up from '#/assets/icon/up.svg';

// TODO: color / refactor
export const IconStyle = styled.div`
  cursor: pointer;

  svg {
    stroke: ${p => (p.stroke ? p.stroke : p.theme.border.idle)};
    transition: ${({ theme }) => theme.transition.out};
  }

  div:hover {
    svg {
      stroke: ${({ theme }) => theme.border.active};
      filter: drop-shadow(0 0 10px #ff0000) drop-shadow(0 0 15px #ff0000);
    }
  }
`;

const names = {
  up,
  down,
  circle,
  times
};

const Icon = ({ name, stroke, ...rest }) => {
  return names[name] ? (
    <IconStyle stroke={stroke}>
      <SvgInline {...rest} svg={names[name]} component="div" />
    </IconStyle>
  ) : null;
};

Icon.propTypes = {
  name: PropTypes.string,
  stroke: PropTypes.string
};

export default Icon;
