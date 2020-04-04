import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import refreshSvg from '../../assets/icon/refresh.svg';
import { Dropdown, IconButton } from '../../components/Form';
import { useIpc, useTranslation } from '../../utils';

const Flex = styled.div`
  display: flex;
`;

const ConfigDropdown = ({ onChange, value, error }) => {
  const [configs, setConfigs] = useState([]);
  const [ipc, load] = useIpc();
  const { t } = useTranslation(['oblige']);

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    try {
      const x = await ipc('oblige/configs');
      setConfigs(x);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex>
      <Dropdown
        name="language"
        options={configs}
        value={value}
        onChange={onChange}
        placeholder={t('oblige:selectConfig')}
        error={error}
        fluid
      />
      <IconButton
        svg={refreshSvg}
        onClick={getOptions}
        load={load}
        style={{ marginRight: 0 }}
      />
    </Flex>
  );
};

ConfigDropdown.propTypes = {
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
};

export default ConfigDropdown;
