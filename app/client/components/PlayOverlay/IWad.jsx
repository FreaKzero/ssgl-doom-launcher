import React from 'react';
import styled from 'styled-components';
import styles from '#Style';
import getCover from '../../assets/covers';

const importAll = r => r.keys().map(r);
const images = importAll(require.context('../../assets/covers/', true));

const IWadStyle = styled.div`
  cursor: pointer;

  &:hover .active .play {
    stroke: ${styles.colorActive};
  }

  &:hover .active .ring-outer {
    transform: rotate(135deg);
  }

  .ring-outer {
    stroke: ${styles.colorActive};

    stroke-width: 9;
  }

  .backdrop {
    stroke-width: 10;
    stroke: red;
    filter: url(#grayscale);
  }

  .backdrop:hover {
    filter: none;
  }

  .play {
    opacity: 0;
    stroke: ${styles.colorMeta};
    transition: ${styles.transitionShort};
  }
`;

const IWad = ({ name, onClick }) => {
  return (
    <div style={{ float: 'left', textAlign: 'center' }}>
      <IWadStyle>
        <svg
          width="80"
          height="80"
          viewBox="0 0 347 347"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClick}
        >
          <defs>
            <pattern
              id={`backdrop_${name}`}
              patternUnits="userSpaceOnUse"
              width="100%"
              height="100%"
            >
              <image
                xlinkHref={getCover(name)}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMin slice"
              />
            </pattern>
          </defs>

          <filter id="grayscale">
            <feColorMatrix values="0.21 0.72 0.072 0 0 0.21 0.72 0.072 0 0 0.21 0.72 0.072 0 0 0 0 0 1 0 " />
          </filter>

          <circle
            r="130"
            cx="174"
            cy="174"
            className="backdrop"
            fill={`url(#backdrop_${name})`}
          />
          <g className="ring-outer">
            <path d="M183.5 43.5H164L174 11L183.5 43.5Z" />
            <path d="M183.5 304H164L174 336.5L183.5 304Z" />
            <path d="M43.5 164L43.5 183.5L11 173.5L43.5 164Z" />
            <path d="M304 164L304 183.5L336.5 173.5L304 164Z" />
            <circle cx="174" cy="174" r="129" />
          </g>
        </svg>
      </IWadStyle>
      {name}
    </div>
  );
};

export default IWad;
