import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { FC, forwardRef } from 'react';
import { CssTextField } from 'yoda-ui/components/Form/TextField/TextField.styles';

const TextField: FC<TextFieldProps> = forwardRef((props, ref) => {
  const { InputLabelProps, ...otherProps } = props;
  return (
    <MuiTextField
      ref={ ref }
      InputLabelProps={ { ...InputLabelProps, shrink: true } }
      { ...otherProps }
      sx={ { ...CssTextField, ...otherProps.sx } }
    />
  );
});

TextField.displayName = 'TextField';

export default TextField;
