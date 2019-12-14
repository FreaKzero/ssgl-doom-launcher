import React from 'react';
import styled from 'styled-components';
import Input from '#Component/Form/Input';

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
