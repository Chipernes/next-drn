import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import { YodaColors } from 'yoda-ui/yodaTheme';

type AlertProps = MuiAlertProps & {
  active?: boolean;
  fitContent?: boolean;
  hideDefaultIcon?: boolean;
  action?: unknown;
};

const useAlertStyle = (fitContent: boolean) => ({
  whiteSpace: 'pre-line',
  display: 'flex',
  ...(fitContent ? {} : {}),
  '&.MuiAlert-standardSuccess': {
    backgroundColor: `${YodaColors.greenSuccessLight}`,
    color: `${YodaColors.greenSuccessDark}`,
    '& .MuiAlert-icon': {
      color: `${YodaColors.greenSuccessDark}`,
    },
  },
  '&.MuiAlert-standardInfo': {
    backgroundColor: `${YodaColors.primaryBlueLightest}`,
    color: `${YodaColors.primaryBlue}`,
    '& .MuiAlert-icon': {
      color: `${YodaColors.primaryBlue}`,
    },
  },
  '&.MuiAlert-standardError': {
    backgroundColor: `${YodaColors.errorLight}`,
    color: `${YodaColors.error}`,
    '& .MuiAlert-icon': {
      color: `${YodaColors.error}`,
    },
  },
  '&.MuiAlert-standardWarning': {
    backgroundColor: `${YodaColors.warningLight}`,
    color: `${YodaColors.warning}`,
    '& .MuiAlert-icon': {
      color: `${YodaColors.warning}`,
    },
  },
  '& *': {
    color: YodaColors.inherit,
  },
});

const Alert: FC<AlertProps> = ({ severity, active = true, fitContent = false, hideDefaultIcon, children, action }) => {
  const isActive = severity && active;
  const alertStyle = useAlertStyle(fitContent);
  const iconProp = hideDefaultIcon ? { icon: false } : null;

  return (
    <Box>
      {
        isActive
          ? (
            <MuiAlert severity={ severity } action={ action } sx={ alertStyle } { ...iconProp }>
              { children }
            </MuiAlert>
          )
          : null
      }
    </Box>
  );
};

export default Alert;
