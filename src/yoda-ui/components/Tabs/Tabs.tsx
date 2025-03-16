import MuiTabs, { TabsProps } from '@mui/material/Tabs';
import { FC } from 'react';
import { YodaColors } from 'yoda-ui/yodaTheme';

const tabsStyle = {
  '& button': {
    borderBottom: `2px solid ${YodaColors.gray3}`,
  },
  '& span.MuiTabs-indicator': {
    backgroundColor: `${YodaColors.primaryBlue}`,
  },
};

const Tabs: FC<TabsProps> = ({ sx, ...props }) => (
  <MuiTabs sx={ { ...tabsStyle, ...sx } } { ...props }/>
);

export default Tabs;
