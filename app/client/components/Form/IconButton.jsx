import PropTypes from 'prop-types';
import React from 'react';
import SvgInline from 'react-svg-inline';
import styled from 'styled-components';

import { ButtonStyle } from './Button';

const IconButtonStyle = styled(ButtonStyle)`
  position: relative;
  min-width: 0;
  height: 37px;
  width: 47px;

  svg {
    fill: ${({ theme }) => theme.button.idle};
    transition: ${({ theme }) => theme.transition.out};
    margin-left: -1px;
    height: 21px;
    filter: drop-shadow(-2px -2px 5px #{styles.button.idle});
  }

  &.load svg {
    filter: ${({ theme }) => theme.svg.glow};
    fill: ${({ theme }) => theme.color.active};
    animation: spin 0.5s infinite;
    animation-timing-function: linear;
  }

  &:hover:not(.load) svg {
    filter: ${({ theme }) => theme.svg.glow};
    fill: ${({ theme }) => theme.color.active};
  }

  @keyframes anim-tooltip {
    0% {
      opacity: 0;
      transform: translateY(15px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tooltip {
    position: absolute;
    font-size: 13px;
    bottom: 110%;
    left: 50%;
    margin-left: -60px;
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    z-index: 101;
  }

  &:hover .tooltip {
    animation-name: anim-tooltip;
    animation-duration: 0.45s;
    animation-timing-function: ease-out;
    visibility: visible;
  }
`;

const IconButton = ({ svg, load, tooltip, ...rest }) => (
  <>
    <IconButtonStyle className={load ? 'load' : undefined} {...rest}>
      {tooltip ? <div className="tooltip">{tooltip}</div> : null}
      <SvgInline svg={svg} />
    </IconButtonStyle>
  </>
);

IconButton.propTypes = {
  load: PropTypes.bool,
  svg: PropTypes.any.isRequired,
  tooltip: PropTypes.string
};

export default IconButton;
