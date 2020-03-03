import React from 'react';
import PropTypes from 'prop-types';
import circle from '#Asset/icon/circle.svg';
import up from '#Asset/icon/up.svg';
import down from '#Asset/icon/down.svg';
import SvgInline from 'react-svg-inline';
import styled from 'styled-components';
import styles from '#Style';

// TODO: color / refactor
const IconStyle = styled.div`
  cursor: pointer;

  svg {
    stroke: ${styles.border.idle};
    transition: ${styles.transition.out};
  }

  div:hover {
    svg {
      stroke: ${styles.border.active};
      filter: drop-shadow(0 0 10px #ff0000) drop-shadow(0 0 15px #ff0000);
    }
  }
`;

const names = {
  up,
  down,
  circle
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
