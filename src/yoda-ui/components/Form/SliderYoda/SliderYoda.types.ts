import { SliderProps } from '@mui/material/Slider';
import { YodaFieldValidation } from 'yoda-ui/yodaForm/yodaForm.types';

export type SliderYodaProps = SliderProps & {
  defaultValue?: number;
  ariaLabel?: string;
  valueLabelDisplay?: string;
  maxWidth?: number;
  disabled?: boolean;
  label: string;
  name: string;
  onChange?: (event: Event) => void;
  required?: boolean;
  type?: string;
  validation?: YodaFieldValidation;
};
