import { ButtonBaseProps, ButtonSize, ButtonVariant } from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.types';
import { Icons } from 'yoda-ui/components/Icons/Icon';

export type TextButtonProps = ButtonBaseProps & {
  label: string;
  icon?: Icons;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};
