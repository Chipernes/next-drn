import merge from 'lodash/merge';
import { ButtonSize, ButtonState, GetSxParams, ButtonBackgroundType, ButtonReverse } from './Buttons.types';

const buildSizePropsSx = ({ sizeProps, size }: Pick<GetSxParams, 'sizeProps' | 'size'>) => {
  if (!sizeProps || !size) {
    return {};
  }
  return {
    ...sizeProps[size]?.[ButtonState.normal],
    '&:hover': sizeProps[size]?.[ButtonState.hover],
    '&.Mui-disabled': sizeProps[size]?.[ButtonState.disabled],
    '&:focus-visible': sizeProps[size]?.[ButtonState.focus],
  };
};

type ByStatePicks = 'variant' | 'variantProps' | 'reverse' | 'backgroundType';

type GetVariantPropsByStateParams = Pick<Required<GetSxParams>, ByStatePicks >
& { buttonState: ButtonState };

const getVariantPropsByState = ({ variantProps, variant, reverse, backgroundType, buttonState }: GetVariantPropsByStateParams) => ({
  ...variantProps.common?.[buttonState],
  ...variantProps[variant]?.[reverse]?.[backgroundType]?.[buttonState],
});

const buildVariantPropsSx = ({ variantProps, variant, reverse, backgroundType }: Omit<GetVariantPropsByStateParams, 'buttonState'>) => ({
  ...getVariantPropsByState({ variantProps, variant, reverse, backgroundType, buttonState: ButtonState.normal }),
  '&:hover': getVariantPropsByState({ variantProps, variant, reverse, backgroundType, buttonState: ButtonState.hover }),
  '&.Mui-disabled': getVariantPropsByState({ variantProps, variant, reverse, backgroundType, buttonState: ButtonState.disabled }),
  '&:focus-visible': getVariantPropsByState({ variantProps, variant, reverse, backgroundType, buttonState: ButtonState.focus }),
});

export const getButtonSx = ({
  sizeProps,
  variantProps,
  size = ButtonSize.medium,
  variant,
  reverse = ButtonReverse.noReverse,
  backgroundType = ButtonBackgroundType.normal,
  sx,
}: GetSxParams) => {
  const sizePropsSx = buildSizePropsSx({ sizeProps, size });
  const variantPropsSx = buildVariantPropsSx({ variant, variantProps, reverse, backgroundType });
  return merge(sizePropsSx, merge(variantPropsSx, sx || {}));
};
