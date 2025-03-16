import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { FC } from 'react';
import getStyles from './CTALink.styles';
import { CTALinkReverse, CTALinkVariant } from './CTALink.types';
import Icon, { Icons } from 'yoda-ui/components/Icons/Icon';

type CTALinkProps = Omit<MuiButtonProps, 'variant'> & {
  endIconName: Icons;
  label: string;
  reverse?: CTALinkReverse;
  variant?: CTALinkVariant;
};

const CTALink: FC<CTALinkProps> = ({
  endIconName,
  label,
  reverse = CTALinkReverse.noReverse,
  variant = CTALinkVariant.primary,
  ...props
}) => {
  const CTALinkStyle = getStyles({ reverse, variant });

  return (
    <MuiButton
      disableRipple
      disableElevation
      endIcon={ <Icon name={ endIconName } /> }
      sx={ CTALinkStyle }
      { ...props }
    >
      { label }
    </MuiButton>
  );
};

export default CTALink;

