import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { StoreContext } from '../../state';
import Check from './Checkmarks';
import Icon from './Icon';
import TagList from './TagList';

const Divider = styled.div`
  width: 5px;
`;
const Content = styled.div`
  width: 100%;

  span {
    transition: ${({ theme }) => theme.transition.out};
  }

  h1 {
    white-space: nowrap;
    transition: ${({ theme }) => theme.transition.out};
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  &.active h1 {
    color: ${({ theme }) => theme.color.active};
  }

  &.active span {
    color: #fff;
  }

  &.active li {
    border: 1px solid white;
    color: white;
  }
`;

const Meta = styled.span`
  color: ${({ theme }) => theme.color.meta};
  font-size: 14px;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const IconContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ItemStyle = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.color.backdrop};
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid ${({ theme }) => theme.border.idle};
  transition: ${({ theme }) => theme.transition.out};
  padding: 10px;
  height: 50px;
  display: flex;
  user-select: none;
  margin-bottom: 5px;

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
  const { gstate } = useContext(StoreContext);

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
        <Check
          theme={gstate.settings.theme}
          size="50"
          active={item.active}
          onClick={onSelect}
        />
        <Divider />
        <Content className={item.active ? 'active' : undefined}>
          <h1>{item.name}</h1>
          <Meta>
            {item.size} {item.kind}{' '}
          </Meta>
          <TagList item={item} />
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
