import React from 'react';
import styled from 'styled-components';
import styles from '#Style';

const ListStyle = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const List = ({ children }) => <ListStyle>{children}</ListStyle>;

export default List;
