import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Dropdown } from '#Component/Form';
import IconButton from '#Component/Form/IconButton';
import refreshSvg from '../../assets/icon/refresh.svg';
import { useTranslation } from '#Util/translation';

const ModFilterStyle = styled.div`
  margin-bottom: 5px;
  display: flex;
`;
const ModFilter = ({
  sortValue,
  onSort,
  onRefresh,
  onInput,
  valueInput,
  refreshLoad,
  size
}) => {
  const { t } = useTranslation('wads');

  const opts = [
    {
      label: t('newest'),
      value: 'new'
    },
    {
      label: t('oldest'),
      value: 'old'
    },
    {
      label: 'A-Z',
      value: 'asc'
    },
    {
      label: 'Z-A',
      value: 'desc'
    }
  ];

  return (
    <ModFilterStyle>
      <Input
        onChange={onInput}
        value={valueInput}
        placeholder={t('filter', { size })}
        fluid
      />
      <Dropdown
        options={opts}
        width="200px"
        onChange={onSort}
        value={sortValue}
      />
      <IconButton svg={refreshSvg} onClick={onRefresh} load={refreshLoad} />
    </ModFilterStyle>
  );
};

ModFilter.propTypes = {
  onInput: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshLoad: PropTypes.bool.isRequired,
  valueInput: PropTypes.string
};

export default ModFilter;
