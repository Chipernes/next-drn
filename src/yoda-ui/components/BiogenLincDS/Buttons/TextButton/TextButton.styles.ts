import { getButtonSx } from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.styles.utils';
import {
  SizeProps,
  ButtonSize,
  ButtonVariantProps,
  ButtonVariant,
  ButtonReverse,
  ButtonBackgroundType,
  GetStylesParams,
} from 'yoda-ui/components/BiogenLincDS/Buttons/Buttons.types';
import { ButtonState } from 'yoda-ui/components/Button/Button.types';
import { YodaBorderRadius, YodaColors, YodaFontSize, YodaFontWeight, YodaSpacing } from 'yoda-ui/yodaTheme';

const sizeProps: SizeProps = {
  [ButtonSize.small]: {
    [ButtonState.normal]: {
      paddingX: YodaSpacing.small,
      paddingY: YodaSpacing.xxxSmall,
      borderRadius: YodaBorderRadius.medium,
      fontSize: YodaFontSize.xSmall,
    },
  },
  [ButtonSize.medium]: {
    [ButtonState.normal]: {
      paddingX: YodaSpacing.medium,
      paddingY: YodaSpacing.xSmall,
      borderRadius: YodaBorderRadius.large,
      fontSize: YodaFontSize.medium,
    },
  },
};
const variantProps: ButtonVariantProps = {
  common: {
    [ButtonState.normal]: {
      fontWeight: YodaFontWeight.medium,
      textTransform: 'none',
      transitionProperty: 'background-color, box-shadow',
    },
    [ButtonState.focus]: {
      outlineWidth: '2px',
      outlineStyle: 'dashed',
    },
  },
  [ButtonVariant.primary]: {
    [ButtonReverse.noReverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.white,
          backgroundColor: YodaColors.primaryBlue,
        },
        [ButtonState.hover]: {
          backgroundColor: YodaColors.primaryBlueHover,
        },
        [ButtonState.focus]: {
          outlineColor: YodaColors.primaryBlue,
        },
        [ButtonState.disabled]: {
          backgroundColor: YodaColors.gray1,
          color: YodaColors.gray3,
        },
      },
    },
    [ButtonReverse.reverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          backgroundColor: YodaColors.white,
          color: YodaColors.gray5,
        },
        [ButtonState.hover]: {
          backgroundColor: YodaColors.white80,
        },
        [ButtonState.focus]: {
          outlineColor: YodaColors.white,
        },
        [ButtonState.disabled]: {
          backgroundColor: YodaColors.gray3,
        },
      },
    },
  },
  [ButtonVariant.secondary]: {
    [ButtonReverse.noReverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.primaryBlue,
          borderColor: YodaColors.primaryBlue,
        },
        [ButtonState.hover]: {
          backgroundColor: YodaColors.primaryBlueLight,
          borderColor: YodaColors.primaryBlue,
        },
        [ButtonState.focus]: {
          outlineColor: YodaColors.primaryBlue,
        },
        [ButtonState.disabled]: {
          color: YodaColors.gray3,
          borderColor: YodaColors.gray3,
        },
      },
    },
    [ButtonReverse.reverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.white,
          borderColor: YodaColors.white,
        },
        [ButtonState.hover]: {
          backgroundColor: YodaColors.white10,
        },
        [ButtonState.focus]: {
          outlineColor: YodaColors.white,
        },
        [ButtonState.disabled]: {
          color: YodaColors.gray3,
          borderColor: YodaColors.gray3,
        },
      },
    },
  },
  [ButtonVariant.neutral]: {
    [ButtonReverse.noReverse]: {
      [ButtonBackgroundType.normal]: {
        [ButtonState.normal]: {
          color: YodaColors.gray4,
        },
        [ButtonState.hover]: {
          backgroundColor: YodaColors.gray1,
        },
        [ButtonState.focus]: {
          backgroundColor: YodaColors.gray1,
          outlineColor: YodaColors.gray3,
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
          backgroundColor: YodaColors.white10,
        },
        [ButtonState.focus]: {
          outlineColor: YodaColors.white,
          backgroundColor: YodaColors.white10,
        },
        [ButtonState.disabled]: {
          color: YodaColors.gray3,
        },
      },
    },
  },
};
const getStyles = ({
  variant,
  size,
  reverse,
  sx,
  backgroundType,
}: GetStylesParams) => getButtonSx({ sizeProps, variantProps, size, variant, reverse, backgroundType, sx });

export default getStyles;
