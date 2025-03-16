import { FC } from 'react';
import FormControlLabel from 'yoda-ui/components/Form/FormControlLabel';
import RadioYoda from 'yoda-ui/components/Form/Radio';
import { RadioConfig } from 'yoda-ui/components/Form/RadioGroup/RadioGroup.types';

type RadioButtonsProps = {
  radioConfigs: RadioConfig[];
};

const RadioButtons: FC<RadioButtonsProps> = ({ radioConfigs }) => {
  const buttons = radioConfigs.map((config) => {
    const { key, controlProps, label, ...formControllProps } = config;
    return (
      <FormControlLabel
        key={ key }
        control={ <RadioYoda { ...controlProps } /> }
        label={ label }
        labelPlacement="start"
        { ...formControllProps }
      />
    );
  });
  return (
    <>
      { buttons }
    </>
  );
};

export default RadioButtons;
