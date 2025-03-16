export enum CTALinkVariant {
  primary = 'primary',
  secondary = 'secondary',
}

export enum CTALinkState {
  disabled = 'disabled',
  focus = 'focus',
  hover = 'hover',
  initial = 'initial',
}

export enum CTALinkReverse {
  noReverse = 'noReverse',
  reverse = 'reverse',
}

export type GetStylesParams = {
  variant: CTALinkVariant;
  reverse: CTALinkReverse;
};

type StyleProps = {
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
};

type CommonProps = {
  common?: StyleProps;
};

export type CTALinkStyleType = {
  [state in CTALinkState]: {
    [reverse in CTALinkReverse]: {
      [key in CTALinkVariant]?: StyleProps;
    } & CommonProps;
  } & CommonProps;
};
