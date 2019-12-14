import React from 'react';
import styled from 'styled-components';
import Input from '#Component/Form/Input';
import IconButton from '#Component/Form/IconButton';
import refreshSvg from '../../assets/icon/refresh.svg';

const ModFilterStyle = styled.div`
  margin-bottom: 5px;
  display: flex;
`;

const ModFilter = ({ onRefresh, onInput, valueInput }) => {
  return (
    <ModFilterStyle>
      <Input onChange={onInput} value={valueInput} placeholder="Filter" fluid />
      <IconButton svg={refreshSvg} onClick={onRefresh} />
    </ModFilterStyle>
  );
};
export default ModFilter;
