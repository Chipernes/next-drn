import { CTALinkReverse, CTALinkState, CTALinkStyleType, CTALinkVariant, GetStylesParams } from './CTALink.types';
import { YodaBorderRadius, YodaColors, YodaFontSize, YodaFontWeight } from 'yoda-ui/yodaTheme';

export const CTALinkStyle: CTALinkStyleType = {
  [CTALinkState.initial]: {
    [CTALinkReverse.noReverse]: {
      [CTALinkVariant.primary]: {
        color: YodaColors.primaryBlue,
      },
      [CTALinkVariant.secondary]: {
        color: YodaColors.gray8,
      },
    },
    [CTALinkReverse.reverse]: {
      [CTALinkVariant.primary]: {
        color: YodaColors.white,
      },
      [CTALinkVariant.secondary]: {
        color: YodaColors.white60,
      },
    },
  },
  [CTALinkState.hover]: {
    common: {
      backgroundColor: 'transparent',
    },
    [CTALinkReverse.noReverse]: {
      [CTALinkVariant.primary]: {
        color: YodaColors.primaryBlueHover,
      },
      [CTALinkVariant.secondary]: {
        color: YodaColors.gray9,
      },
    },
    [CTALinkReverse.reverse]: {
      [CTALinkVariant.primary]: {
        color: YodaColors.white60,
      },
      [CTALinkVariant.secondary]: {
        color: YodaColors.white30,
      },
    },
  },
  [CTALinkState.focus]: {
    [CTALinkReverse.noReverse]: {
      common: {
        borderColor: YodaColors.primaryBlue,
      },
      [CTALinkVariant.primary]: {
        color: YodaColors.primaryBlue,
      },
      [CTALinkVariant.secondary]: {
        color: YodaColors.gray8,
      },
    },
    [CTALinkReverse.reverse]: {
      [CTALinkVariant.primary]: {
        color: YodaColors.white,
      },
      [CTALinkVariant.secondary]: {
        color: YodaColors.white60,
      },
    },
  },
  [CTALinkState.disabled]: {
    [CTALinkReverse.noReverse]: {
      common: {
        color: YodaColors.gray3,
      },
    },
    [CTALinkReverse.reverse]: {
      common: {
        color: YodaColors.white60,
      },
    },
  },
};

const baseStyles = {
  fontSize: YodaFontSize.medium,
  fontWeight: YodaFontWeight.medium,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: YodaBorderRadius.small,
  borderColor: 'transparent',
};

const getPropsByState = ({ variant, reverse, ctaLinkState }: {
  variant: CTALinkVariant;
  reverse: CTALinkReverse;
  ctaLinkState: CTALinkState;
}) => ({
  ...CTALinkStyle[ctaLinkState].common || {},
  ...CTALinkStyle[ctaLinkState][reverse].common || {},
  ...CTALinkStyle[ctaLinkState][reverse][variant] || {},
});

const getStyles = ({ variant, reverse }: GetStylesParams) => ({
  ...baseStyles,
  ...getPropsByState({ variant, reverse, ctaLinkState: CTALinkState.initial }),
  '&:hover': getPropsByState({ variant, reverse, ctaLinkState: CTALinkState.hover }),
  '&.Mui-disabled': getPropsByState({ variant, reverse, ctaLinkState: CTALinkState.disabled }),
  '&:focus-visible': getPropsByState({ variant, reverse, ctaLinkState: CTALinkState.focus }),
});

export default getStyles;
