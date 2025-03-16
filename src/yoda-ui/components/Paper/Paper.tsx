import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { FC } from 'react';
import Box from 'yoda-ui/components/Box';
import { YodaBorderRadius, YodaBoxShadow, YodaFontSize, YodaSpacing } from 'yoda-ui/yodaTheme';

type PaperProps = MuiPaperProps & {
  borderRadius?: YodaBorderRadius;
  margin?: YodaSpacing;
  maxHeight?: number;
  overflow?: string;
};

const usePaperStyle = (borderRadius?: YodaBorderRadius) => ({
  boxShadow: YodaBoxShadow.medium,
  borderRadius: borderRadius || 0,
  fontWeight: 300,
  fontSize: YodaFontSize.small,
});

const Paper: FC<PaperProps> = ({
  hidden = false,
  borderRadius,
  margin = YodaSpacing.xxLarge,
  children,
  maxHeight,
  overflow,
}) => {
  const paperStyle = usePaperStyle(borderRadius);
  return (
    <MuiPaper
      hidden={ hidden }
      sx={ paperStyle }
      elevation={ 0 }
    >
      <Box margin={ margin } maxHeight={ maxHeight } overflow={ overflow }>
        { children }
      </Box>
    </MuiPaper>
  );
};

export default Paper;
