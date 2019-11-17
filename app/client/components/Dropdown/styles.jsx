import styled from 'styled-components';
import styles from '#Style';

export const OptionItem = styled.li`
  list-style-type: none;
  display: inline-block;
  width: 100%;
  display: block;
  cursor: pointer;
  padding: 10px;
  margin: 0;
  transition: all 0.3s ease-out;
  background-color: #161416;

  &:hover {
    background-color: black;
    color: ${styles.colorActive};
  }
`;
export const Options = styled.ul`
  position: absolute;
  width: ${p => (p.width ? `calc(${p.width})` : `calc(100% - 16px)`)};
  display: block;
  font-size: 14px;
  margin: 0;
  padding: 0;
  color: white;
  z-index: 999;
  height: 0;
  border-radius: 3px;
  max-height: 145px;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: height 0.13s ease-out;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(12, 8, 8, 0.8);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${styles.colorActive};
  }
  .open & {
    height: 145px;
    border-radius: 0 0 3px 3px;
    border: 1px solid ${styles.colorActive};
    border-top: none;
  }
`;

export const Selected = styled.div`
  background-color: #161416;
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  display: flex;

  .open & {
    border-radius: 3px 3px 0 0;
  }

  .open & input {
    text-shadow: 0 0 0 grey;
  }

  & input::placeholder {
    opacity: 1;
    text-shadow: 0 0 0 grey;
  }

  & input {
    font-family: 'Rajdhani', sans-serif;
    width: 100%;
    color: transparent;
    text-shadow: 0 0 0 white;
    font-size: 14px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    background-image: none;
    box-shadow: none;
    outline: none;
    margin: 0;
  }
`;

export const DropdownStyle = styled.div`
  display: inline-block;
  margin-right: 5px;

  .container {
    border: 1px solid ${styles.colorMeta};
    width: ${p => (p.width ? p.width : '100%')};
    transition: all 0.21s ease-out;

    &:hover {
      border: 1px solid ${styles.colorActive};
    }
  }

  .container:hover svg {
    stroke: #ffa800;
    filter: drop-shadow(0px -1px 4px #ff0000) drop-shadow(0px 0px 10px #ff0000);
  }

  svg {
    stroke: grey;
    margin: 3px 0 0 0;
    transition: all 0.21s ease-out;
  }

  .open svg {
    transform: rotate(180deg);
  }
`;
