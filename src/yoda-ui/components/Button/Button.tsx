'use client';

import MuiButton from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { FC, useCallback, useState } from 'react';
import ButtonStyles from './Button.styles';
import { ButtonProps, ButtonState, ButtonType, StylesByType } from './Button.types';
import IconButtonStyles from './IconButton.styles';
import { YodaBorderRadius } from 'yoda-ui/yodaTheme';

const useButtonStyles = (type: ButtonType, spec: StylesByType, buttonWidth?: number): SxProps<Theme> => ({
  padding: '0.75rem 1.5rem',
  borderRadius: `${YodaBorderRadius.xxxLarge}`,
  boxSizing: 'border-box',
  textTransform: 'none',
  height: '40px',
  ...buttonWidth && { width: `${buttonWidth}px` },
  ...spec[ButtonState.normal][type],
  '&:hover': {
    ...spec[ButtonState.hover][type],
    cursor: 'pointer',
  },
  '&.Mui-disabled': {
    ...spec[ButtonState.disabled][type],
  },
  '&.Mui-focusVisible': {
    ...spec[ButtonState.focus][type],
  },
});

const Button: FC<ButtonProps> = (props) => {
  const {
    buttonType = ButtonType.neutral,
    ...rest
  } = props;
  const { startIcon } = props;
  const buttonSpec = startIcon ? IconButtonStyles : ButtonStyles;
  const [buttonWidth, setButtonWidth] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const measuredRef = useCallback((node: any) => {
    if (node !== null) {
      setButtonWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const buttonStyle = useButtonStyles(buttonType, buttonSpec, buttonWidth);

  return (
    <MuiButton
      { ...rest }
      disableElevation
      disableRipple
      ref={ measuredRef }
      sx={ buttonStyle }
    />
  );
};

export default Button;
