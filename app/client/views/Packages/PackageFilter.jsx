import React from 'react';
import PropTypes from 'prop-types';
import { Input, Dropdown } from '../../components/Form';
import { useTranslation } from '#Util';
import styled from 'styled-components';

const PackageFilterStyle = styled.div`
  display: flex;
`;

const PackageFilter = ({ onInput, onSort, sortValue, size }) => {
  const { t } = useTranslation(['packages', 'filters']);

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
        fluid
      />
      <Dropdown
        options={opts}
        width="200px"
        onChange={onSort}
        value={sortValue}
      />
    </PackageFilterStyle>
  );
};

export default PackageFilter;
