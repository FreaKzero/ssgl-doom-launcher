import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ErrorCheckmark from './Checkmarks/ErrorCheckmark';

const Divider = styled.div`
  width: 5px;
`;
const Content = styled.div`
  width: 100%;

  span {
    color: #fff;
  }

  h1 {
    white-space: nowrap;
    transition: ${({ theme }) => theme.transition.out};
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-transform: uppercase;
    color: #f55945;
  }

  .active li {
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

const ItemStyle = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.color.backdrop};
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid #f55945;
  transition: ${({ theme }) => theme.transition.out};
  padding: 10px;
  height: 50px;
  display: flex;
  user-select: none;
  margin-bottom: 5px;

  &:hover {
    border: 1px solid #ff2f00;
  }

  &:hover h1 {
    color: #ff2f00;
  }
`;

const ErrorItem = ({ style, id, onSelect }) => {
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
        <ErrorCheckmark onClick={onSelect} size="50" />
        <Divider />
        <Content>
          <h1>{id}</h1>
          <Meta>NOT FOUND</Meta>
        </Content>
      </ItemStyle>
    </motion.li>
  );
};

ErrorItem.propTypes = {
  id: PropTypes.string,
  style: PropTypes.any,
  onSelect: PropTypes.func.isRequired
};

export default ErrorItem;
