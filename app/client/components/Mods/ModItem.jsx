import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Check from './Check';
import Icon from './Icon';

const Divider = styled.div`
  width: 5px;
`;
const Content = styled.div`
  width: 100%;

  p {
    transition: ${({ theme }) => theme.transition.out};
  }

  h1 {
    transition: ${({ theme }) => theme.transition.out};
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  &.active h1 {
    color: ${({ theme }) => theme.color.active};
  }

  &.active p {
    color: #fff;
  }
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.color.meta};
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
  background: ${({ theme }) => theme.color.backdrop};
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid ${({ theme }) => theme.border.idle};
  transition: ${({ theme }) => theme.transition.out};
  padding: 10px;
  height: 50px;
  display: flex;
  margin-bottom: 5px;
  user-select: none;

  &:hover {
    border: 1px solid ${({ theme }) => theme.border.active};
  }

  &:hover h1 {
    color: ${({ theme }) => theme.color.active};
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
  style: PropTypes.any,
  onDown: PropTypes.func,
  onUp: PropTypes.func,
  onCircle: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default ModItem;
