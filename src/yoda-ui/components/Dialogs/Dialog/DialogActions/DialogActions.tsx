import MuiDialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import { FC } from 'react';

const DialogActions: FC<DialogActionsProps> = (props) => (
  <MuiDialogActions { ...props } />
);

export default DialogActions;
