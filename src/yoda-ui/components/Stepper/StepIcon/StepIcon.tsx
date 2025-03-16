import { StepIconProps } from '@mui/material/StepIcon';
import Box from 'yoda-ui/components/Box';
import Icon, { Icons } from 'yoda-ui/components/Icons/Icon';
import { YodaBorderRadius, YodaColors } from 'yoda-ui/yodaTheme';

const stepIconStyles = {
  root: {
    zIndex: 1,
    color: `${YodaColors.gray4}`,
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    borderRadius: `${YodaBorderRadius.round}`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    color: `${YodaColors.gray1}`,
    backgroundColor: `${YodaColors.completed}`,
  },
  error: {
    color: `${YodaColors.gray1}`,
    backgroundColor: `${YodaColors.error}`,
  },
  active: {
    color: `${YodaColors.gray1}`,
    backgroundColor: `${YodaColors.primaryBlue}`,
  },
  iconLarge: {
    width: '1rem',
    height: '1rem',
  },
  iconSmall: {
    width: '0.8rem',
    height: '0.8rem',
  },
  iconNext: {
    fill: `${YodaColors.gray4}`,
    width: '1rem',
    height: '1rem',
  },
};

const StepIcon = (props: StepIconProps) => {
  const { active, completed, error } = props;
  let icon = <Icon name={ Icons.brightness1 } sx={ stepIconStyles.iconNext } />;
  const rootStyle = stepIconStyles.root;
  let iconStyle = {};

  if (completed) {
    icon = <Icon name={ Icons.check } sx={ stepIconStyles.iconLarge } />;
    iconStyle = stepIconStyles.completed;
  }
  if (error) {
    icon = <Icon name={ Icons.notificationsNone } sx={ stepIconStyles.iconSmall } />;
    iconStyle = stepIconStyles.error;
  }
  if (active) {
    icon = <Icon name={ Icons.fiberManualRecordRounded } sx={ stepIconStyles.iconSmall } />;
    iconStyle = stepIconStyles.active;
  }

  return (
    <>
      <Box sx={ { ...rootStyle, ...iconStyle } }>{ icon }</Box>
    </>
  );
};

export default StepIcon;
