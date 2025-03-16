import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepperMui from '@mui/material/Stepper';
import { FC, MouseEvent, useEffect, useState } from 'react';
import StepConnector from './StepConnector';
import StepIcon from './StepIcon';
import { stepperStyle } from './Stepper.styles';

export type StepItem = {
  title: string;
  isValid: boolean;
  disabled: boolean;
};

type StepperProps = {
  handleChangeStep?: (newValue: number) => void;
  stepIndex: number;
  stepsList: StepItem[];
  orientation?: 'vertical' | 'horizontal';
};

const StyledStepper: FC<StepperProps> = ({
  handleChangeStep,
  stepIndex,
  stepsList,
  orientation = 'vertical',
}) => {
  const [maxStep, setMaxStep] = useState(0);

  useEffect(() => {
    if (stepIndex > maxStep) {
      setMaxStep(stepIndex);
    }
  }, [stepIndex, maxStep]);

  const handleOnClick = (_: MouseEvent<HTMLDivElement>, newValue: number) => {
    if (handleChangeStep) {
      handleChangeStep(newValue);
    }
  };

  return (
    <StepperMui
      activeStep={ stepIndex }
      connector={ <StepConnector orientation={ orientation } /> }
      orientation={ orientation }
    >
      {
        stepsList.map((step, index) => (
          <Step key={ step.title } disabled={ step.disabled }>
            <StepLabel
              sx={ stepperStyle }
              StepIconComponent={ StepIcon }
              StepIconProps={ { completed: step.isValid && index <= maxStep } }
              error={ !step.isValid && index <= maxStep }
              onClick={ !step.disabled ? (event) => handleOnClick(event, index) : undefined }
            >
              { step.title }
            </StepLabel>
          </Step>
        ))
      }
    </StepperMui>
  );
};

export default StyledStepper;
