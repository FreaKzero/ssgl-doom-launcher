import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ListStyle = styled.ul`
  text-align: center;
`;

const List = ({ children }) => <ListStyle>{children}</ListStyle>;

List.propTypes = {
  children: PropTypes.any
};

export default List;
