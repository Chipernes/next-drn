import { FC, ReactNode } from 'react';
import Box from 'yoda-ui/components/Box';
import Button from 'yoda-ui/components/Button';
import { ButtonType } from 'yoda-ui/components/Button/Button.types';
import Dialog from 'yoda-ui/components/Dialogs/Dialog';
import DialogActions from 'yoda-ui/components/Dialogs/Dialog/DialogActions';
import DialogContent from 'yoda-ui/components/Dialogs/Dialog/DialogContent';
import DialogTitle from 'yoda-ui/components/Dialogs/Dialog/DialogTitle';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

type ConfirmationDialogProps = {
  children: ReactNode;
  dialogTitle: string;
  dialogMessage?: string;
  onConfirmLabel: string;
  onDismissLabel: string;
  onConfirm: () => void;
  onDismiss: () => void;
};

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  children,
  dialogTitle,
  dialogMessage,
  onConfirmLabel,
  onDismissLabel,
  onConfirm,
  onDismiss,
}) => (
  <Dialog open maxWidth="md">
    <Box padding={ YodaSpacing.xLarge }>
      <DialogTitle>
        <Box textAlign="center" lineHeight="2rem">
          { dialogTitle }
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box marginBottom={ YodaSpacing.xLarge } textAlign="center" lineHeight="1.5rem">
          { children || dialogMessage }
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={ onDismiss } buttonType={ ButtonType.neutral }>
          { onDismissLabel }
        </Button>
        <Button onClick={ onConfirm } buttonType={ ButtonType.primary }>
          { onConfirmLabel }
        </Button>
      </DialogActions>
    </Box>
  </Dialog>
);

export default ConfirmationDialog;
