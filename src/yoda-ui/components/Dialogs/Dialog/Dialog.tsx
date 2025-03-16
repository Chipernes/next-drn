import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { FC, useMemo } from 'react';
import { SxProps, YodaBorderRadius } from 'yoda-ui/yodaTheme';

export type DialogProps = Omit<MuiDialogProps, 'sx'> & {
  borderRadius?: YodaBorderRadius;
  sx?: SxProps;
  minWidth?: string;
  minHeight?: string;
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const getDialogStyle = ((borderRadius: YodaBorderRadius, sx?: SxProps | any, minWidth?: string, minHeight?: string) => ({
  ...sx,
  '& .MuiDialog-paper': {
    borderRadius,
    minWidth,
    minHeight,
    ...(sx && '& .MuiDialog-paper' in sx && sx['& .MuiDialog-paper']),
  },
}));

const Dialog: FC<DialogProps> = ({ borderRadius = YodaBorderRadius.none, sx, minWidth, minHeight, ...rest }) => {
  const dialogStyle = useMemo(() => getDialogStyle(borderRadius, sx, minWidth, minHeight), [borderRadius, sx, minWidth, minHeight]);
  return (
    <MuiDialog
      sx={ dialogStyle }
      { ...rest }
    />
  );
};

export default Dialog;
