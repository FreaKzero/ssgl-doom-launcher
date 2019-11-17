import React from 'react';
import styled from 'styled-components';
import Dropdown from '#Component/Dropdown';
import Input from '#Component/Input';

const ModFilterStyle = styled.div`
  display: flex;
  margin-bottom: 5px;

  .input {
    width: 100%;
  }
`;
const ModFilter = ({ onInput, valueInput }) => {
  return (
    <ModFilterStyle>
      <Input width="100%" onChange={onInput} value={valueInput} />
      <Dropdown
        width="100px"
        onChange={() => 1}
        options={new Array(100)
          .fill(1)
          .map((i, idx) => ({ label: idx, value: idx }))}
      />
    </ModFilterStyle>
  );
};

export default ModFilter;
