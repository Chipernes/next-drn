import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import { FC } from 'react';
import { tooltipStyle, arrowStyle } from './Tooltip.styles';

const Tooltip: FC<TooltipProps> = (props) => (
  <MuiTooltip componentsProps={ { tooltip: { sx: tooltipStyle }, arrow: { sx: arrowStyle } } } { ...props } />
);

export default Tooltip;
