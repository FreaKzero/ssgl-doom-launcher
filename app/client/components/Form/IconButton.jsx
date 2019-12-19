import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import { ButtonStyle } from './Button';
import SvgInline from 'react-svg-inline';

const IconButtonStyle = styled(ButtonStyle)`
  min-width: 0;
  height: 37px;
  width: 37px;

  &:hover:not(.load) svg {
    filter: drop-shadow(0px -1px 4px #ff0000) drop-shadow(0px 0px 10px #ff0000);
    fill: ${styles.color.active};
  }

  &.load svg {
    filter: drop-shadow(0px -1px 4px #ff0000) drop-shadow(0px 0px 10px #ff0000);
    fill: ${styles.color.active};
    animation: spin 0.5s infinite;
  }

  svg {
    margin-left: -1px;
    height: 21px;
    filter: drop-shadow(-2px -2px 5px #1d2226);
    fill: #808080;
    transition: ${styles.transition.out};
  }
`;

const IconButton = ({ svg, load, ...rest }) => (
  <>
    <IconButtonStyle className={load ? 'load' : undefined} {...rest}>
      <SvgInline svg={svg} />
    </IconButtonStyle>
  </>
);

IconButton.propTypes = {
  load: PropTypes.bool,
  svg: PropTypes.any.isRequired
};

export default IconButton;
