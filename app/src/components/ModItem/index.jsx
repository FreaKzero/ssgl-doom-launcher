import React from 'react';
import styled from 'styled-components';
import not from '#Asset/not.png';
import Icon from './Icon';
import styles from '#Style';

console.log(styles);
const ItemStyle = styled.div`
  background: rgba(12, 8, 8, 0.8);
  border-radius: 6px;
  padding: 10px;
  height: 80px;
  display: flex;
  border: 1px solid ${styles.colorMeta};
  transition: ${styles.transitionLong};
  margin-bottom: 10px;

  &:hover {
    border: 1px solid ${styles.colorActive};
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
  .meta {
    color: ${styles.colorMeta};
  }
  .content {
    width: 100%;
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
