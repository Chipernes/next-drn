import MuiTab, { TabProps } from '@mui/material/Tab';
import { FC } from 'react';

const tabStyle = {
  fontWeight: 300,
  '&.Mui-selected': {
    fontWeight: 500,
  },
};

const Tab: FC<TabProps> = ({ sx, ...props }) => (
  <MuiTab sx={ { ...tabStyle, ...sx } } { ...props } />
);

export default Tab;
