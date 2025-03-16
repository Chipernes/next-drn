import { ReactNode } from 'react';
import { formLayoutStickyStyles } from './FormLayout.styles';
import Box from 'yoda-ui/components/Box';

const FormLayoutMidPanelHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      width="25%"
      sx={ formLayoutStickyStyles }
    >
      { children }
    </Box>
  );
};

export default FormLayoutMidPanelHeader;
