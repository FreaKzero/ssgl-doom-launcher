import React from 'react';
import PropTypes from 'prop-types';
import up from '#Asset/icon/up.svg';
import down from '#Asset/icon/down.svg';
import SvgInline from 'react-svg-inline';
import styled from 'styled-components';

const IconStyle = styled.div`
  cursor: pointer;
  div:hover {
    svg {
      stroke: #ffa800;
      filter: drop-shadow(0px -1px 4px #ff0000)
        drop-shadow(0px 0px 10px #ff0000) drop-shadow(0px 0px 15px #ff0000);
    }
  }
  svg {
    stroke: #6f6f6f;
    transition: all 0.25s ease-out;
  }
`;

const names = {
  up,
  down
};

const Icon = ({ name, ...rest }) => {
  return names[name] ? (
    <IconStyle>
      <SvgInline {...rest} svg={names[name]} component="div" />
    </IconStyle>
  ) : null;
};

Icon.propTypes = {
  name: PropTypes.string
};

export default Icon;
