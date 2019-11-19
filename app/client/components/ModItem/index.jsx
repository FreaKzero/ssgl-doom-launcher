import React from 'react';
import styled from 'styled-components';
import not from '#Asset/not.png';
import styles from '#Style';
import Icon from './Icon';
import Check from './Check';
import { motion } from 'framer-motion';

const Caret = () => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9379 1H2.06213C1.39866 1 0.967141 1.69821 1.26385 2.29164L5.70172 11.1674C6.03063 11.8252 6.96937 11.8252 7.29828 11.1674L11.7361 2.29164C12.0329 1.69821 11.6013 1 10.9379 1Z"
        strokeWidth="2"
      />
    </svg>
  );
};

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-content: space-between;

  span {
    display: block;
    height: 100%;
  }
`;

const ItemStyle = styled.div`
  background: rgba(12, 8, 8, 0.8);
  border-radius: 6px;
  padding: 10px;
  height: 60px;
  display: flex;
  border: 1px solid ${styles.colorMeta};
  transition: ${styles.transitionLong};
  margin-bottom: 5px;

  &:hover {
    border: 1px solid ${styles.colorActive};
  }
  &:hover h1 {
    color: ${styles.colorActive};
  }
  .divider {
    width: 5px;
  }

  .content {
    width: 100%;

    h1 {
      font-size: 18px;
      margin-bottom: 5px;
      transition: ${styles.transitionLong};
      text-transform: uppercase;

      &.active {
        color: ${styles.colorActive};
      }
    }

    .meta {
      color: ${styles.colorMeta};
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
`;

/*

<IconContainer>
        <Icon name="up" width="16" />
        <Icon name="remove" width="16" />
        <Icon name="down" width="16" />
      </IconContainer>
       */
const Item = ({ item, onSelect }) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1
      }}
      exit={{ opacity: 0 }}
    >
      <ItemStyle>
        <Check size={60} active={item.active} onClick={onSelect} />
        <div className="divider" />
        <div className="content">
          <h1 className={item.active ? 'active' : undefined}>{item.name}</h1>
          <div className="meta">meta</div>
          <div className="meta">{item.kind}</div>
        </div>
      </ItemStyle>
    </motion.li>
  );
};

export default Item;
