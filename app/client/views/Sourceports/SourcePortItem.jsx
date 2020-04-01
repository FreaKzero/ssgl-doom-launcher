import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Meta = styled.div`
  color: #858585;
  font-size: 14px;
  margin-bottom: 5px;
`;

const SourcePortStyle = styled.div`
  display: flex;
  background: rgba(12, 8, 8, 0.8);
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border.idle};
  transition: ${({ theme }) => theme.transition.out};
  margin-bottom: 5px;
  user-select: none;
  cursor: pointer;

  .indicator {
    background-color: ${({ theme }) => theme.color.active};
    box-shadow: ${({ theme }) => theme.font.glow};
    margin-right: 10px;
    width: 0;
    transition: ${({ theme }) => theme.transition.out};
  }

  & h1 {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    transition: ${({ theme }) => theme.transition.out};
    text-transform: uppercase;
  }

  &:hover .indicator,
  &.active .indicator {
    width: 10px;
  }

  &:hover h1,
  &.active h1 {
    color: ${({ theme }) => theme.color.active};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.border.active};
  }
`;

const SourcePortItem = ({ item, onClick, ...rest }) => {
  return (
    <motion.li
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
      <SourcePortStyle onClick={onClick} {...rest}>
        <div className="indicator" />
        <div>
          <h1>{item.name}</h1>
          <Meta>{item.binary}</Meta>
        </div>
      </SourcePortStyle>
    </motion.li>
  );
};

SourcePortItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    binary: PropTypes.string
  }),
  onClick: PropTypes.func.isRequired
};

export default SourcePortItem;
