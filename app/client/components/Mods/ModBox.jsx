import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import ModItem from './ModItem';
import styled from 'styled-components';
import styles from '#Style';

const BoxStyle = styled.div`
  border: 1px solid ${styles.border.idle};
  border-radius: ${styles.border.radius};
  background: ${styles.box.backdrop};
  backdrop-filter: blur(5px);
  flex-grow: 1;
  padding: 10px;
  height: calc(100vh - 140px);

  & > ul > div {
    padding-right: 5px;
    ${styles.scrollbar};
  }
`;

const ModBox = ({ data, onClick, fixed }) => {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(365);

  useLayoutEffect(() => {
    const updateSize = () =>
      setHeight(boxRef.current.getBoundingClientRect().height - 85);

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <BoxStyle fixed={fixed} ref={boxRef}>
      {fixed ? <div className="fixed">{fixed}</div> : null}

      <ul>
        <VirtualList
          width="100%"
          height={height}
          itemCount={data.length}
          itemSize={77}
          renderItem={({ index, style }) => (
            <ModItem
              style={style}
              key={`mod_${data[index].id}`}
              item={data[index]}
              onSelect={onClick(data[index].id)}
            />
          )}
        />
      </ul>
    </BoxStyle>
  );
};

ModBox.propTypes = {
  data: PropTypes.any,
  fixed: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default ModBox;
