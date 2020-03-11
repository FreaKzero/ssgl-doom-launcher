import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  text-transform: uppercase;
  font-size: 14px;
  user-select: none;
  margin: ${p => (p.error ? '0 0 3px 10px;' : '0 0 3px 3px')};
  color: ${p => (p.error ? 'red' : 'white')};
`;

export default Label;
