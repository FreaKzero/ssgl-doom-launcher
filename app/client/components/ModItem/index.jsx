import React from 'react';
import styled from 'styled-components';
import not from '#Asset/not.png';
import styles from '#Style';
import Icon from './Icon';
import Check from './Check';
import { motion } from 'framer-motion';

const IconContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ItemStyle = styled.div`
  background: rgba(12, 8, 8, 0.8);
  border-radius: ${styles.border.radius};
  padding: 10px;
  height: 60px;
  display: flex;
  border: 1px solid ${styles.border.idle};
  transition: ${styles.transition.out};
  margin-bottom: 5px;

  &:hover {
    border: 1px solid ${styles.border.active};
  }
  &:hover h1 {
    color: ${styles.color.active};
  }
  .divider {
    width: 5px;
  }

  .content {
    width: 100%;

    h1 {
      font-size: 18px;
      margin-bottom: 5px;
      transition: ${styles.transition.out};
      text-transform: uppercase;

      &.active {
        color: ${styles.color.active};
      }
    }

    .meta {
      color: ${styles.color.idle};
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
`;

const Item = ({ item, onSelect, onUp, onDown, selected = false }) => {
  const spring = {
    type: 'tween'
  };
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1
      }}
      exit={{ opacity: 0 }}
      layoutTransition={spring}
    >
      <ItemStyle>
        <Check size={60} active={item.active} onClick={onSelect} />
        <div className="divider" />
        <div className="content">
          <h1 className={item.active ? 'active' : undefined}>{item.name}</h1>
          <div className="meta"></div>
          <div className="meta">
            {item.kind} {item.size}
          </div>
        </div>
        {selected ? (
          <IconContainer>
            <Icon name="up" width="16" onClick={onUp} />
            <Icon name="down" width="16" onClick={onDown} />
          </IconContainer>
        ) : (
          false
        )}
      </ItemStyle>
    </motion.li>
  );
};

export default Item;
