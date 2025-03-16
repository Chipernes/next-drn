import { ButtonProps } from '@mui/material/Button';
import { HTMLAttributeAnchorTarget } from 'react';
import { SxProps } from 'yoda-ui/yodaTheme';

export enum ButtonVariant {
  neutral = 'neutral',
  primary = 'primary',
  secondary = 'secondary',
}

export enum ButtonSize {
  medium = 'medium',
  small = 'small',
  xSmall = 'xSmall',
}

export enum ButtonBackgroundType {
  noBackground = 'noBackground',
  normal = 'normal',
}

export enum ButtonReverse {
  noReverse = 'noReverse',
  reverse = 'reverse',
}

export type ButtonBaseProps = {
  reverse?: ButtonReverse;
  sx?: SxProps;
  target?: HTMLAttributeAnchorTarget;
} & Omit<ButtonProps, 'sx' | 'variant' | 'size'>;

export enum ButtonState {
  disabled = 'disabled',
  focus = 'focus',
  hover = 'hover',
  normal = 'normal',
}

export type StylesByType = {
  [state in ButtonState]: {
    [reverse in ButtonReverse]: SxProps
  }
};

export type GetStylesParams = {
  variant: ButtonVariant;
  size?: ButtonSize;
  reverse?: ButtonReverse;
  backgroundType?: ButtonBackgroundType;
  sx?: SxProps;
};

export type SizeProps = {
  [key in ButtonSize]?: ButtonStateProps
};

type ButtonStateProps = {
  [key in ButtonState]?: SxProps
};

type CommonProps = {
  common?: ButtonStateProps;
};

export type ButtonVariantProps = {
  [variant in ButtonVariant]?: {
    [reverse in ButtonReverse]?: {
      [backgroundType in ButtonBackgroundType]?: ButtonStateProps
    }
  };
} & CommonProps;

export type CommonVariantProps = {
  common: {
    [key in ButtonState]?: SxProps;
  };
};

export type GetSxParams = GetStylesParams & {
  sizeProps?: SizeProps;
  variantProps: ButtonVariantProps;
};
