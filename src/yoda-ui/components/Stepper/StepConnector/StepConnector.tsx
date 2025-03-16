import StepConnector from '@mui/material/StepConnector';
import { FC } from 'react';
import { YodaColors } from 'yoda-ui/yodaTheme';

const stepConnectorVerticalStyle = {
  width: 0,
  height: '5rem',
  marginLeft: '11px',
  border: `${YodaColors.gray4} solid 1px`,
};

const stepConnectorHorizontalStyle = {
  width: 'auto',
  height: 0,
  margin: 0,
  border: `${YodaColors.gray4} solid 1px`,
};

type StepperConnectorProps = {
  orientation?: 'vertical' | 'horizontal';
};

const StyledStepConnector: FC<StepperConnectorProps> = ({ orientation = 'vertical' }) => (
  <StepConnector sx={ orientation === 'vertical' ? stepConnectorVerticalStyle : stepConnectorHorizontalStyle } />
);

export default StyledStepConnector;
