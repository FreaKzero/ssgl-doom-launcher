import PropTypes from 'prop-types';
import React from 'react';

import { useTranslation } from '../utils';
import { Button } from './Form';
import { Modal } from './index';

const Confirm = ({ active, onOk, onCancel }) => {
  const { t } = useTranslation(['common']);

  return (
    <Modal active={active} title={t('common:deleteTitle')} tiny strict>
      {t('common:deleteText')}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Button
          type="button"
          border={'#f55945'}
          glow={'#b8342a'}
          color={'#ff2f00'}
          onClick={onCancel}
          width="100px"
        >
          {t('cancel')}
        </Button>
        <Button
          type="button"
          style={{ margin: 0 }}
          width="100px"
          onClick={onOk}
        >
          {t('ok')}
        </Button>
      </div>
    </Modal>
  );
};

Confirm.propTypes = {
  active: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired
};

export default Confirm;
