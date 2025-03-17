import { ReactNode } from 'react';
import { formLayoutPaddingTop, formLayoutStickyStyles } from './FormLayout.styles';
import Box from 'yoda-ui/components/Box';
import { YodaSpacing } from 'yoda-ui/yodaTheme';

const FormLayoutRightPanel = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      paddingTop={ formLayoutPaddingTop }
      display="flex"
      marginLeft={ YodaSpacing.large }
      sx={ formLayoutStickyStyles }
    >
      { children }
    </Box>
  );
};

export default FormLayoutRightPanel;
