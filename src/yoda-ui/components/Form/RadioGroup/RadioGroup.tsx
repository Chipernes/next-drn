import MuiRadioGroup from '@mui/material/RadioGroup';
import { FC } from 'react';
import RadioButtons from './RadioButtons';
import { radioGroupStyle } from './RadioGroup.styles';
import { RadioGroupProps } from './RadioGroup.types';
import { useYodaField } from 'yoda-ui/yodaForm';

const RadioGroup: FC<RadioGroupProps> = ({ radioConfigs, name, defaultValue, validation, onChange, value: _value, ...props }) => {
  const { onChangeField, fieldValue } = useYodaField({
    name,
    defaultValue,
    validation,
    onChange,
  });

  return (
    <MuiRadioGroup
      sx={ radioGroupStyle }
      onChange={ onChangeField }
      value={ fieldValue }
      { ...props }
    >
      <RadioButtons radioConfigs={ radioConfigs } />
    </MuiRadioGroup>
  );
};

export default RadioGroup;
