import React from 'react';
import styled from 'styled-components';
import Dropdown from '#Component/Dropdown';
import Input from '#Component/Input';

const ModFilterStyle = styled.div`
  margin-bottom: 5px;
`;

const ModFilter = ({ onInput, valueInput }) => {
  return (
    <ModFilterStyle>
      <Input onChange={onInput} value={valueInput} placeholder="Filter" fluid />
    </ModFilterStyle>
  );
};
export default ModFilter;
