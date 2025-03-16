import React from 'react';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

export type TextYodaInputProps = {
  defaultValue?: string;
  disabled?: boolean;
  display?: boolean;
  focused?: boolean;
  hiddeControls?: boolean;
  label: string;
  max?: string | number;
  min?: string | number;
  multiline?: boolean;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  rows?: number;
  shrink?: boolean;
  step?: number;
  type?: string;
  validation?: YodaFieldValidation;
};
