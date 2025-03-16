import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { FC } from 'react';
import { YodaColors } from 'yoda-ui/yodaTheme';

const linkButtonStyle = {
  backgroundColor: `${YodaColors.white}`,
  color: `${YodaColors.gray5}`,
  padding: 0,
  '&:hover': {
    backgroundColor: `${YodaColors.white}`,
    color: `${YodaColors.primaryBlue}`,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

const LinkButton: FC<MuiButtonProps> = (props) => (
  <MuiButton
    sx={ linkButtonStyle }
    disableElevation
    disableRipple
    { ...props }
  />
);

export default LinkButton;
