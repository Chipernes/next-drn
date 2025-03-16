import {
  ButtonType,
  ButtonState,
  StylesByType,
} from './Button.types';
import { YodaColors } from 'yoda-ui/yodaTheme';

const ButtonStyles: StylesByType = {
  [ButtonState.normal]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.primaryBlue}`,
      color: `${YodaColors.white}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.secondary]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.gray4}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.primaryBlue}`,
      border: `2px solid ${YodaColors.primaryBlue}`,
    },
    [ButtonType.home]: {
      backgroundColor: `${YodaColors.blue7}`,
      color: `${YodaColors.white}`,
      border: `2px solid ${YodaColors.blue7}`,
    },
  },
  [ButtonState.hover]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.primaryBlueHover}`,
      color: `${YodaColors.white}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.secondary]: {
      backgroundColor: `${YodaColors.gray1}`,
      color: `${YodaColors.gray4}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.primaryBlueLight}`,
      color: `${YodaColors.primaryBlue}`,
      border: `2px solid ${YodaColors.primaryBlue}`,
    },
    [ButtonType.home]: {
      backgroundColor: `${YodaColors.blue8}`,
      color: `${YodaColors.white}`,
      border: `2px solid ${YodaColors.blue8}`,
    },
  },
  [ButtonState.disabled]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.gray1}`,
      color: `${YodaColors.gray3}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.secondary]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.gray3}`,
      border: `2px solid ${YodaColors.white}`,
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.gray1}`,
      color: `${YodaColors.gray3}`,
      border: `2px solid ${YodaColors.white}`,
    },
  },
  [ButtonState.focus]: {
    [ButtonType.primary]: {
      backgroundColor: `${YodaColors.primaryBlue}`,
      color: `${YodaColors.white}`,
      border: `2px dashed ${YodaColors.white}`,
    },
    [ButtonType.secondary]: {
      backgroundColor: `${YodaColors.gray1}`,
      color: `${YodaColors.gray4}`,
      border: `2px dashed ${YodaColors.gray3}`,
    },
    [ButtonType.neutral]: {
      backgroundColor: `${YodaColors.white}`,
      color: `${YodaColors.primaryBlue}`,
      border: `2px dashed ${YodaColors.primaryBlue}`,
    },
  },
};

export default ButtonStyles;
