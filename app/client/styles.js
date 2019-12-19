const styles = {
  font: {
    head: "'Michroma', sans-serif",
    content: "'Rajdhani', sans-serif",
    glow: '0 0 5px #ff0000, 0 0 15px #ff0000;'
  },
  svg: {
    glow: `drop-shadow(0 -1px 4px #ff0000) drop-shadow(0 0 10px #ff0000)`,
    red: '#5f100f',
    yellow: '#ffa800',
    grey: '#6f6f6f'
  },
  box: {
    backdrop: 'rgba(0, 0, 0, 0.3)'
  },
  transition: {
    out: 'all 0.25s ease-out',
    in: 'all 0.25s ease-in',
    short: 'all 0.15s ease-out',
    bounce: 'all 0.2s cubic-bezier(0.45, -0.79, 0, 1.77)',
    bouncelong: 'all 0.35s cubic-bezier(0.45, -0.79, 0, 1.77)'
  },
  button: {
    idle: '#808080',
    back: 'linear-gradient(180deg, #3f464c 0%, #1d2025 100%);',
    disabled: '#1d2025',
    shadow: '-1px -1px 5px #1d2226'
  },
  color: {
    glow: '#ff0000',
    active: '#ffa800',
    meta: '#6f6f6f',
    idle: '#fff',
    grey: '#6f6f6f',
    backdrop: 'rgba(12, 8, 8, 0.8)',
    back: '#1d2025',
    red: '#5f100f'
  },
  border: {
    radius: '3px',
    active: '#ffa800',
    idle: '#262626',
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
