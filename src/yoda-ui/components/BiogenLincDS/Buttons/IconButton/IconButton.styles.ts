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
import { fromUnitsToRem, YodaBorderRadius, YodaColors, YodaFontWeight, YodaSpacing } from 'yoda-ui/yodaTheme';

const sizeProps: SizeProps = {
  [ButtonSize.xSmall]: {
    [ButtonState.normal]: {
      minWidth: fromUnitsToRem(YodaSpacing.xxxSmall),
      minHeight: fromUnitsToRem(YodaSpacing.xxxSmall),
      padding: '0px 2px',
    },
  },
  [ButtonSize.small]: {
    [ButtonState.normal]: {
      minWidth: fromUnitsToRem(YodaSpacing.large),
      minHeight: fromUnitsToRem(YodaSpacing.large),
    },
  },
  [ButtonSize.medium]: {
    [ButtonState.normal]: {
      minWidth: fromUnitsToRem(YodaSpacing.xxLarge),
      minHeight: fromUnitsToRem(YodaSpacing.xxLarge),
    },
  },
};
const variantProps: ButtonVariantProps = {
  common: {
    [ButtonState.normal]: {
      borderRadius: YodaBorderRadius.round,
      borderWidth: '2px',
      borderColor: YodaColors.transparent,
      borderStyle: 'solid',
      fontWeight: YodaFontWeight.medium,
      textTransform: 'none',
      transitionProperty: 'background-color, box-shadow',
    },
    [ButtonState.focus]: {
      borderStyle: 'dashed',
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
          borderColor: YodaColors.white,
        },
        [ButtonState.disabled]: {
          backgroundColor: YodaColors.gray1,
          color: YodaColors.gray3,
        },
      },
      [ButtonBackgroundType.noBackground]: {
        [ButtonState.normal]: {
          color: YodaColors.gray4,
          minWidth: 'unset',
          minHeight: 'unset',
          padding: YodaSpacing.none,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: YodaColors.transparent,
        },
        [ButtonState.hover]: {
          minWidth: 'unset',
          minHeight: 'unset',
          padding: YodaSpacing.none,
          color: YodaColors.primaryBlue,
          backgroundColor: YodaColors.transparent,
        },
        [ButtonState.focus]: {
          borderColor: YodaColors.primaryBlue,
          borderStyle: 'solid',
          paddingX: YodaSpacing.xxxSmall,
          marginX: -1 * YodaSpacing.xxxSmall,
          paddingY: YodaSpacing.xxxxSmall,
          marginY: -1 * YodaSpacing.xxxxSmall,
          borderRadius: YodaBorderRadius.xSmall,
        },
        [ButtonState.disabled]: {
          minWidth: 'unset',
          minHeight: 'unset',
          padding: YodaSpacing.none,
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
          outline: `2px ${YodaColors.white} dashed`,
        },
        [ButtonState.disabled]: {
          backgroundColor: YodaColors.gray3,
        },
      },
      [ButtonBackgroundType.noBackground]: {
        [ButtonState.normal]: {
          color: YodaColors.white,
          minWidth: 'unset',
          minHeight: 'unset',
          padding: YodaSpacing.none,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: YodaColors.transparent,
        },
        [ButtonState.hover]: {
          color: YodaColors.white80,
          minWidth: 'unset',
          minHeight: 'unset',
          padding: YodaSpacing.none,
        },
        [ButtonState.focus]: {
          borderColor: YodaColors.white,
          borderStyle: 'solid',
          paddingX: YodaSpacing.xxxSmall,
          marginX: -1 * YodaSpacing.xxxSmall,
          paddingY: YodaSpacing.xxxxSmall,
          marginY: -1 * YodaSpacing.xxxxSmall,
          borderRadius: YodaBorderRadius.xSmall,
        },
        [ButtonState.disabled]: {
          color: YodaColors.gray3,
          minWidth: 'unset',
          minHeight: 'unset',
          padding: YodaSpacing.none,
        },
      },
    },
  },
  [ButtonVariant.secondary]: {
    [ButtonReverse.noReverse]: {
      [ButtonBackgroundType.normal]:
      {
        [ButtonState.normal]: {
          color: YodaColors.primaryBlue,
          backgroundColor: YodaColors.white,
          borderColor: YodaColors.primaryBlue,
          borderStyle: 'solid',
        },
        [ButtonState.hover]: {
          backgroundColor: YodaColors.primaryBlueLight,
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
          color: YodaColors.gray5,
        },
        [ButtonState.hover]: {
          backgroundColor: YodaColors.gray1,
        },
        [ButtonState.focus]: {
          backgroundColor: YodaColors.gray1,
          borderColor: YodaColors.gray3,
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
          backgroundColor: YodaColors.white10,
          borderColor: YodaColors.white,
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
