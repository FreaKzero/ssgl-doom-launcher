import React from 'react';
import PropTypes from 'prop-types';
import { Input, Dropdown } from '../../components/Form';
import { useTranslation } from '#Util';
import styled from 'styled-components';

const PackageFilterStyle = styled.div`
  display: flex;
`;

const PackageFilter = ({ onInput, onSort, sortValue, size }) => {
  const { t } = useTranslation('packages');

  const opts = [
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
      <Input placeholder={t('filter', { size })} onChange={onInput} fluid />
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
