import MuiDialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import { FC } from 'react';

const DialogTitle: FC<DialogTitleProps> = (props) => (
  <MuiDialogTitle { ...props } />
);

export default DialogTitle;
