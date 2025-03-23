import { CSSProperties } from 'react';

export const headerStyle: CSSProperties = {
  width: '100%',
  height: '100px',
};

export const toolbarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
};

export const drnLogoStyle = {
  width: '5rem',
  height: '5rem',

  '& > img': {
    width: '100%',
    height: '100%',
    objectPosition: 'center',
  },

  '& > *:hover': {
    cursor: 'pointer',
  },
};
