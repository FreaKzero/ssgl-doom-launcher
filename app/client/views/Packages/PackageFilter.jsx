import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { Dropdown, Input } from '../../components/Form';
import { useTranslation } from '../../utils';

const PackageFilterStyle = styled.div`
  display: flex;
`;

const PackageFilter = ({ onInput, onSort, sortValue, size }) => {
  const { t } = useTranslation(['packages', 'filters']);

  const opts = [
    {
      label: t('filters:lastplayed'),
      value: 'last'
    },
    {
      label: t('filters:newest'),
      value: 'new'
    },
    {
      label: t('filters:oldest'),
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
    <PackageFilterStyle>
      <Input
        placeholder={t('packages:filter', { size })}
        onChange={onInput}
        shortcut="ctrl+f, cmd+f"
        fluid
      />
      <Dropdown
        name="packageSort"
        options={opts}
        width="200px"
        onChange={onSort}
        value={sortValue}
        shortcut="ctrl+d, cmd+d"
      />
    </PackageFilterStyle>
  );
};

PackageFilter.propTypes = {
  onInput: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  sortValue: PropTypes.string
};

export default PackageFilter;
