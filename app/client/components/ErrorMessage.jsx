import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '#Style';

const ErrorMessageStyle = styled.div`
  border: 1px solid #f57242;
  backdrop-filter: blur(5px);
  background: rgba(193, 66, 66, 0.2);
  border-radius: 7px;
  flex-grow: 1;
  width: 80%;
  padding: 15px;
  margin: 0 auto;
  margin-top: 20px;

  h1 {
    color: #f57242;
    text-transform: uppercase;
    font-family: ${styles.font.head};
    margin-bottom: 15px;
    font-size: 30px;
  }
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorMessageStyle>
      <h1>Error!</h1>
      <p>{message}</p>
    </ErrorMessageStyle>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
