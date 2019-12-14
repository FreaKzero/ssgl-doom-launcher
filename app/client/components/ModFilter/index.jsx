import React from 'react';
import styled from 'styled-components';
import Input from '#Component/Form/Input';
import IconButton from '#Component/Form/IconButton';
import refreshSvg from '../../assets/icon/refresh.svg';
import { useTranslation } from '#Util/translation';

const ModFilterStyle = styled.div`
  margin-bottom: 5px;
  display: flex;
`;

const ModFilter = ({ onRefresh, onInput, valueInput }) => {
  const { t } = useTranslation('wads');
  return (
    <ModFilterStyle>
      <Input
        onChange={onInput}
        value={valueInput}
        placeholder={t('filter')}
        fluid
      />
      <IconButton svg={refreshSvg} onClick={onRefresh} />
    </ModFilterStyle>
  );
};
export default ModFilter;
