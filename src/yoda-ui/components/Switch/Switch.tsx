import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import { ChangeEvent, FC } from 'react';
import { switchStyle } from './Switch.styles';

type SwitchProps = MuiSwitchProps & {
  onSwitch: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const Switch: FC<SwitchProps> = ({ onSwitch, ...rest }) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    sx={ switchStyle }
    onChange={ onSwitch }
    { ...rest }
  />
);

export default Switch;
