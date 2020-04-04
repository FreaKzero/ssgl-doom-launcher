import styled from 'styled-components';

const ObligeLog = styled.div`
  width: calc(100% - 20px);
  height: 200px;
  overflow-x: none;
  overflow-y: scroll;
  font-family: monospace;
  background-color: ${({ theme }) => theme.color.backdrop};
  border-radius: ${({ theme }) => theme.border.radius};
  border: ${({ theme }) => `1px solid ${theme.border.idle}`};
  padding: 7px 7px 7px 7px;
  ${({ theme }) => theme.scrollbar};
  white-space: pre;
`;
export default ObligeLog;
