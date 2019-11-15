import React from 'react';
import styled from 'styled-components';
import not from '#Asset/not.png';
import styles from '#Style';
import Icon from './Icon';
import Check from './Check';

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
  margin-bottom: 10px;

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
    }

    .meta {
      color: ${styles.colorMeta};
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
`;

const Item = ({ item, onSelect }) => {
  return (
    <ItemStyle>
      <Check size={60} active={item.active} onClick={onSelect} />
      <div className="divider" />
      <div className="content">
        <h1>{item.name}</h1>
        <div className="meta">some meta inf</div>
        <div className="meta">{item.kind}</div>
      </div>
      <IconContainer>
        <Icon name="up" width="16" />
        <Icon name="remove" width="16" />
        <Icon name="down" width="16" />
      </IconContainer>
    </ItemStyle>
  );
};

export default Item;
