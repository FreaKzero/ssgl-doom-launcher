import { createGlobalStyle } from 'styled-components';

const styles = {
  font: {
    content: "font-family: 'Michroma', sans-serif;",
    head: "font-family: 'Rajdhani', sans-serif;"
  },
  svg: {
    red: '#5f100f',
    yellow: '#ffa800',
    grey: '#6f6f6f'
  },
  transition: {
    out: 'all 0.25s ease-out',
    in: 'all 0.25s ease-in',
    short: 'all 0.15s ease-out',
    bounce: 'all 0.2s cubic-bezier(0.45, -0.79, 0, 1.77)'
  },
  color: {
    active: '#ffa800',
    meta: '#6f6f6f',
    idle: '#fff',
    grey: '#6f6f6f',
    backdrop: 'rgba(12, 8, 8, 0.8)',
    red: '#5f100f'
  },
  border: {
    radius: '4px',
    active: '#ffa800',
    idle: '#6f6f6f',
    red: '#5f100f'
  },
  back: 'rgba(12, 8, 8, 0.8)',
  scrollbar: `
  &::-webkit-scrollbar { 
    width: 7px;
    background-color: rgba(12, 8, 8, 0.8);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ffa800;
  }
  `
};

export default styles;
