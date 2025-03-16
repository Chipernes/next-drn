import Button from '@mui/material/Button';
import { FC } from 'react';
import getStyles from './TextButton.styles';
import { TextButtonProps } from './TextButton.types';
import TextButtonContent from './TextButtonContent';
import { ButtonReverse, ButtonSize, ButtonVariant } from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.types';

const TextButton: FC<TextButtonProps> = ({
  variant = ButtonVariant.primary,
  reverse = ButtonReverse.noReverse,
  size = ButtonSize.medium,
  sx,
  label,
  icon,
  loading,
  ...buttonProps
}) => {
  const styles = getStyles({ variant, reverse, size, sx });
  return (
    <Button
      disableElevation
      disableRipple
      sx={ styles }
      { ...buttonProps }
    >
      <TextButtonContent
        label={ label }
        icon={ icon }
        loading={ loading }
      />
    </Button>
  );
};

export default TextButton;
