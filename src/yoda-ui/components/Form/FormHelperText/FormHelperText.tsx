import MuiFormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import { FC } from 'react';

const FormHelperText: FC<FormHelperTextProps> = (props) => (
  <MuiFormHelperText { ...props } />
);

export default FormHelperText;
