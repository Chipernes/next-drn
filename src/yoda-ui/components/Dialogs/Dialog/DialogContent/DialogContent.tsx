import MuiDialogContent, { DialogContentProps as MuiDialogContentProps } from '@mui/material/DialogContent';
import { FC, useMemo } from 'react';
import { YodaFontWeight } from 'yoda-ui/yodaTheme';

type DialogContentProps = MuiDialogContentProps & {
  fontWeight?: YodaFontWeight;
};

const getDialogContentStyle = ({
  fontWeight = YodaFontWeight.medium,
}: { fontWeight?: YodaFontWeight }) => ({
  '&.MuiDialogContent-root': {
    fontWeight,
  },
});

const DialogContent: FC<DialogContentProps> = ({ fontWeight, ...props }) => {
  const dialogContentStyle = useMemo(() => getDialogContentStyle({ fontWeight }), [fontWeight]);

  return (
    <MuiDialogContent
      sx={ dialogContentStyle }
      { ...props }
    />
  );
};

export default DialogContent;
