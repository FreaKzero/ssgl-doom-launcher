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
  transition: ${styles.transition.out};
  background-color: ${styles.color.backdrop};

  &:hover {
    background-color: black;
    color: ${styles.color.active};
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
  border-radius: ${styles.border.radius};
  max-height: 145px;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: height 0.13s ease-out;

  ${styles.scrollbar}

  .open & {
    height: 145px;
    border-radius: 0 0 ${styles.border.radius} ${styles.border.radius};
    border: 1px solid ${styles.border.active};
    border-top: none;
  }
`;

export const Selected = styled.div`
  background-color: ${styles.color.backdrop};
  display: inline-block;
  padding: 10px;
  border-radius: ${styles.border.radius};
  display: flex;

  .open & {
    border-radius: ${styles.border.radius} ${styles.border.radius} 0 0;
  }

  .open & input {
    text-shadow: 0 0 0 grey;
  }

  & input::placeholder {
    opacity: 1;
    text-shadow: 0 0 0 grey;
  }

  & input {
    font-family: ${styles.font.content};
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
    border: 1px solid ${styles.border.idle};
    width: ${p => (p.width ? p.width : '100%')};
    transition: ${styles.transition.out};

    &:hover {
      border: 1px solid ${styles.border.active};
    }
  }

  .container:hover svg {
    stroke: ${styles.color.active};
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
