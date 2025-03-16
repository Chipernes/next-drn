import { ButtonBaseProps, ButtonSize, ButtonVariant } from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.types';
import { Icons } from 'yoda-ui/components/Icons/Icon';

export type ActionButtonSize = ButtonSize.medium;
export type ActionButtonVariant = ButtonVariant.primary | ButtonVariant.neutral;

export type ActionButtonProps = ButtonBaseProps & {
  label: string;
  icon?: Icons;
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
};

