import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';
import Icon from './Icon';
import Check from './Check';
import { motion } from 'framer-motion';

const Divider = styled.div`
  width: 5px;
`;
const Content = styled.div`
  width: 100%;

  p {
    transition: ${styles.transition.out};
  }

  h1 {
    transition: ${styles.transition.out};
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  &.active h1 {
    color: ${styles.color.active};
  }

  &.active p {
    color: #fff;
  }
`;

const Meta = styled.p`
  color: ${styles.color.meta};
  font-size: 14px;
  margin-bottom: 5px;
`;

const IconContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ItemStyle = styled.div`
  background: ${styles.color.backdrop};
  border-radius: ${styles.border.radius};
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  padding: 10px;
  height: 50px;
  display: flex;
  margin-bottom: 5px;
  user-select: none;

  &:hover {
    border: 1px solid ${styles.border.active};
  }

  &:hover h1 {
    color: ${styles.color.active};
  }
`;

const ModItem = ({
  style,
  item,
  onSelect,
  onUp,
  onDown,
  onCircle = () => null,
  selected = false
}) => {
  return (
    <motion.li
      style={style}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      exit={{ opacity: 0 }}
      layoutTransition={{
        type: 'tween'
      }}
    >
      <ItemStyle>
        <Check size="50" active={item.active} onClick={onSelect} />
        <Divider />
        <Content className={item.active ? 'active' : undefined}>
          <h1>{item.name}</h1>
          <Meta>
            {item.lastdir} / {item.kind} / {item.size}
          </Meta>
        </Content>
        {selected ? (
          <IconContainer>
            <Icon name="up" width="13" onClick={onUp} />
            <Icon name="circle" width="13" onClick={onCircle} />
            <Icon name="down" width="13" onClick={onDown} />
          </IconContainer>
        ) : (
          false
        )}
      </ItemStyle>
    </motion.li>
  );
};

ModItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    lastdir: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  }),
  onDown: PropTypes.func,
  onUp: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default ModItem;
