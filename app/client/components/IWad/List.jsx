import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListStyle = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const List = ({ children }) => <ListStyle>{children}</ListStyle>;

List.propTypes = {
  children: PropTypes.any
};

export default List;
