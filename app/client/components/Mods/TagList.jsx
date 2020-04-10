import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Tags = styled.ul`
  user-select: none;
  height: 65px;
  list-style: none;
  display: inline-block;
`;

const Tag = styled.li`
  color: white;
  display: inline;
  margin-right: 5px;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 4px;
  background: ${({ theme }) => theme.svg.dark};
  padding: 0 6px 0 6px;
`;

const TagList = ({ item }) => {
  return item.tags.length ? (
    <Tags>
      {item.tags.map(tag => {
        return <Tag key={`${item.id}_${item.tag}`}>{tag}</Tag>;
      })}
    </Tags>
  ) : null;
};

TagList.propTypes = {
  item: PropTypes.any
};

export default TagList;
