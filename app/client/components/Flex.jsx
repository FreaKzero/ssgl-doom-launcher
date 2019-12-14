import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: flex;
`;

const Col = styled.div`
  width: ${p => p.width || '100%'};
  &:nth-child(odd) {
    margin: 0 5px 0 0;
  }

  &:nth-child(even) {
    margin: 0 0 0 5px;
  }
`;

export default {
  Grid,
  Col
};
