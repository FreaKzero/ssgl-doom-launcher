import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import refreshSvg from '../../assets/icon/refresh.svg';
import { useTranslation } from '../../utils';
import { Dropdown, IconButton, Input } from '../Form';

const ModFilterStyle = styled.div`
  display: flex;
`;
const ModFilter = ({
  sortValue,
  onSort,
  onRefresh,
  onInput,
  refreshLoad,
  size
}) => {
  const { t } = useTranslation(['wads', 'filters']);

  const opts = [
    {
      label: t('filters:newest'),
      value: 'new'
    },
    {
      label: t('filters:oldest'),
      value: 'old'
    },
    {
      label: t('filters:active'),
      value: 'active'
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
        placeholder={t('wads:filter', { size })}
        fluid
      />
      <Dropdown
        name="sortvalue"
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
  sortValue: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired
};

export default ModFilter;
