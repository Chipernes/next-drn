import {
  ButtonType,
  ButtonState,
  StylesByType,
} from './Button.types';
import { YodaColors } from 'yoda-ui/yodaTheme';

const IconButtonStyles: StylesByType = {
  [ButtonState.normal]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.primaryBlue}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.gray4}`,
      border: `2px solid ${YodaColors.white}`,
    },
  },
  [ButtonState.hover]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.primaryBlueHover}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.gray5}`,
      border: `2px solid ${YodaColors.white}`,
    },
  },
  [ButtonState.disabled]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.gray3}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.gray3}`,
      border: `2px solid ${YodaColors.white}`,
    },
  },
  [ButtonState.focus]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.primaryBlue}`,
      '& > span': {
        borderBottom: `2px dashed ${YodaColors.primaryBlue}`,
      },
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.gray4}`,
      '& > span': {
        borderBottom: `2px dashed ${YodaColors.gray4}`,
      },
    },
  },
};

export default IconButtonStyles;
