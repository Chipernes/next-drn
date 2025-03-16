import { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import { ReactElement } from 'react';
import { FormControlLabelProps } from 'yoda-ui/components/Form/FormControlLabel';
import { RadioProps } from 'yoda-ui/components/Form/Radio';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

export type RadioConfig = Omit<FormControlLabelProps, 'control'> & {
  key: string;
  controlProps?: RadioProps;
  control?: ReactElement;
};

export type RadioGroupProps = MuiRadioGroupProps & {
  name: string;
  radioConfigs: RadioConfig[];
  validation?: YodaFieldValidation;
};
