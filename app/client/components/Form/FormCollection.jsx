import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormCollectionStyle = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.border.idle};
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 10px 10px 0 10px;
  margin-bottom: 15px;

  h3 {
    font-size: 13px;
    font-family: ${({ theme }) => theme.font.head};
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.active};
    text-shadow: ${({ theme }) =>
      `0 -1px 4px ${theme.color.active}, 0 0 15px ${theme.color.active}`};
    margin-bottom: 15px;
  }
`;

const FormCollection = ({ children, title }) => {
  return (
    <FormCollectionStyle>
      {title ? <h3>{title}</h3> : null}
      {children}
    </FormCollectionStyle>
  );
};

FormCollection.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string
};

export default FormCollection;
