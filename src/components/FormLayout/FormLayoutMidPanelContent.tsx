import { ReactNode } from 'react';
import Box from 'yoda-ui/components/Box';

const FormLayoutMidPanelContent = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      width="75%"
      display="flex"
      flexDirection="column"
    >
      { children }
    </Box>
  );
};

export default FormLayoutMidPanelContent;
