import Button from '@mui/material/Button';
import { FC } from 'react';
import getStyles from './ActionButton.styles';
import { ActionButtonProps } from './ActionButton.types';
import ActionButtonContent from './ActionButtonContent';
import { ButtonSize, ButtonReverse, ButtonVariant } from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.types';

const ActionButton: FC<ActionButtonProps> = ({
  size = ButtonSize.medium,
  label,
  icon,
  reverse = ButtonReverse.noReverse,
  variant = ButtonVariant.primary,
  sx,
  ...buttonProps
}) => {
  const styles = getStyles({ variant, size, reverse, sx });

  return (
    <Button
      disableElevation
      disableRipple
      sx={ styles }
      { ...buttonProps }
    >
      <ActionButtonContent label={ label } icon={ icon } />
    </Button>);
};

export default ActionButton;
