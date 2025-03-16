import MuiFormControlLabel, { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';
import { FC } from 'react';
import { YodaFontSize } from 'yoda-ui/yodaTheme';

const formControlLabelStyle = {
  label: {
    '& span.MuiFormControlLabel-label': {
      fontWeight: 300,
      fontSize: `${YodaFontSize.medium}`,
    },
  },
};

export type FormControlLabelProps = MuiFormControlLabelProps;

const FormControlLabel: FC<MuiFormControlLabelProps> = ({
  label,
  control,
  ...props
}) => (
  <MuiFormControlLabel
    sx={ formControlLabelStyle }
    control={ control }
    label={ label }
    { ...props }
  />
);

export default FormControlLabel;
