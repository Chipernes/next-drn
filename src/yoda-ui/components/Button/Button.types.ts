import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { YodaColors } from 'yoda-ui/yodaTheme';

export enum ButtonType {
  neutral = 'neutral',
  primary = 'primary',
  secondary = 'secondary',
  home = 'home',
}

export enum ButtonState {
  disabled = 'disabled',
  focus = 'focus',
  hover = 'hover',
  normal = 'normal',
}

export type ButtonProps = MuiButtonProps & {
  buttonType?: ButtonType;
};

type ButtonTypeObject = {
  [ key in ButtonType ]?: {
    backgroundColor: string | YodaColors;
    color: string | YodaColors;
    [key: string]: string | {
      borderBottom: string;
    };
  }
};

export type StylesByType = {
  [ key in ButtonState ]: ButtonTypeObject
};
