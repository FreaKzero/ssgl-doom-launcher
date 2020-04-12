import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Tags = styled.ul`
  user-select: none;
  list-style: none;
  display: inline-block;
`;

const Tag = styled.li`
  transition: ${({ theme }) => theme.transition.out};
  color: ${({ theme }) => theme.color.meta};
  display: inline;
  margin-right: 5px;
  font-size: 12px;
  border: ${({ theme }) => `1px solid ${theme.color.meta}`};
  border-radius: 4px;
  padding: 0 6px 0 6px;

  &.clickable {
    cursor: pointer;
  }

  &.clickable:hover {
    border: ${({ theme }) => `1px solid ${theme.color.active}`};
    color: ${({ theme }) => theme.color.active};
  }
`;

const TagList = ({ item, onTag }) => {
  return item.tags.length ? (
    <Tags>
      <Tag
        key={`${item.id}_##BACK##`}
        className={onTag ? 'clickable' : ''}
        onClick={onTag ? onTag('##BACK##') : null}
      >
        /
      </Tag>
      {item.tags.map((tag, idx) => {
        return (
          <Tag
            key={`${item.id}_${idx}_${tag}`}
            className={onTag ? 'clickable' : ''}
            onClick={onTag ? onTag(tag) : null}
          >
            {tag}
          </Tag>
        );
      })}
    </Tags>
  ) : null;
};

TagList.propTypes = {
  item: PropTypes.any,
  onTag: PropTypes.any
};

export default TagList;
