import MuiSelect, { SelectProps } from '@mui/material/Select';
import { FC } from 'react';

const Select: FC<SelectProps> = (props) => (
  <MuiSelect { ...props } />
);

export default Select;
