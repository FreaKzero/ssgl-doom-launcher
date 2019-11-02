import React from 'react';
import styled from 'styled-components';
import not from '#Asset/not.png';
import Icon from './Icon';
import styles from '#Style';

const ItemStyle = styled.div`
  background: rgba(12, 8, 8, 0.8);
  border-radius: 6px;
  padding: 10px;
  height: 70px;
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
  img {
    border-radius: 5px;
    background: black;
  }
  .divider {
    width: 5px;
    margin: 0 10px 0 10px;
    background: ${styles.colorActive};
  }

  .content {
    width: 100%;

    h1 {
      font-size: 18px;
      margin-bottom: 10px;
      transition: ${styles.transitionLong}
    }

    .meta {
      color: ${styles.colorMeta};
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
  .icons {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-content: space-between;

    span {
      display: block;
      height: 100%;
    }
  }
`;

const Item = () => {
  return (
    <ItemStyle>
      <img src={not} />
      <div className="divider" />
      <div className="content">
        <h1>Brutal Doom</h1>
        <div className="meta">some meta inf</div>
        <div className="meta">pk3</div>
      </div>
      <div className="icons">
        <Icon name="up" width="20" />
        <Icon name="remove" width="15" />
        <Icon name="down" width="20" />
      </div>
    </ItemStyle>
  );
};

export default Item;
