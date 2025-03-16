import { getButtonSx } from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.styles.utils';
import {
  ButtonReverse, ButtonSize, ButtonState, ButtonVariant, ButtonVariantProps, GetStylesParams, SizeProps, ButtonBackgroundType,
} from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.types';
import { YodaBorderRadius, YodaColors, YodaSpacing, YodaFontSize, YodaFontWeight } from 'yoda-ui/yodaTheme';

const sizeProps: SizeProps = {
  [ButtonSize.medium]: {
    [ButtonState.normal]: {
      fontSize: YodaFontSize.medium,
      padding: 0,
      borderRadius: YodaBorderRadius.small,
    },
    [ButtonState.focus]: {
      paddingX: YodaSpacing.xxxSmall,
      marginX: -1 * YodaSpacing.xxxSmall,
      paddingY: YodaSpacing.xxxxSmall,
      marginY: -1 * YodaSpacing.xxxxSmall,
    },
  },
};
const variantProps: ButtonVariantProps = {
  common: {
    [ButtonState.normal]: {
      backgroundColor: YodaColors.transparent,
      fontWeight: YodaFontWeight.medium,
      borderStyle: 'solid',
      borderWidth: '1px',
      textTransform: 'none',
      borderColor: YodaColors.transparent,
      transitionProperty: 'background-color, box-shadow',
    },
    [ButtonState.hover]: {
      backgroundColor: YodaColors.transparent,
    },
  },
  [ButtonVariant.primary]: {
    [ButtonReverse.noReverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.primaryBlue,
        },
        [ButtonState.hover]: {
          color: YodaColors.primaryBlueHover,
        },
        [ButtonState.focus]: {
          color: YodaColors.primaryBlue,
          borderColor: YodaColors.primaryBlue,
        },
        [ButtonState.disabled]: {
          color: YodaColors.gray3,
        },
      },
    },
    [ButtonReverse.reverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.white,
        },
        [ButtonState.hover]: {
          color: YodaColors.white80,
        },
        [ButtonState.focus]: {
          borderColor: YodaColors.white,
          color: YodaColors.white,
        },
        [ButtonState.disabled]: {
          color: YodaColors.white30,
        },
      },
    },
  },
  [ButtonVariant.neutral]: {
    [ButtonReverse.noReverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.gray5,
        },
        [ButtonState.hover]: {
          color: YodaColors.gray4,
        },
        [ButtonState.focus]: {
          color: YodaColors.gray5,
          borderColor: YodaColors.primaryBlue,
        },
        [ButtonState.disabled]: {
          color: YodaColors.gray3,
        },
      },
    },
    [ButtonReverse.reverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.white60,
        },
        [ButtonState.hover]: {
          color: YodaColors.white30,
        },
        [ButtonState.focus]: {
          borderColor: YodaColors.white80,
          color: YodaColors.white60,
        },
        [ButtonState.disabled]: {
          color: YodaColors.white60,
        },
      },
    },
  },
};

const getStyles = ({ variant, size, reverse, sx }: GetStylesParams) => getButtonSx({ sizeProps, variantProps, size, variant, reverse, sx });

export default getStyles;
