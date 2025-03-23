import { FC } from 'react';
import {
  formContainerStyle,
  formContainerContentStyle,
  formContainerActionsStyle,
  formContainerLeftActionsStyle,
} from './FormContainer.style';
import { FormContainerTypes } from './FormContainer.types';
import ActionButton from 'components/ActionButton/ActionButton';
import ContentCard from 'components/ContentCard/ContentCard';
import Box from 'yoda-ui/components/Box';
import { YodaFormProvider } from 'yoda-ui/yodaForm';

const FormContainer: FC<FormContainerTypes> = ({
  providerFields,
  cancelButtonConfig,
  submitButtonConfig,
  exportDataButtonConfig,
  children,
}) => {
  return (
    <YodaFormProvider { ...providerFields }>
      <Box sx={ formContainerStyle }>
        <ContentCard sx={ formContainerContentStyle }>
          { children }
        </ContentCard>
        <Box sx={ formContainerActionsStyle }>
          <Box sx={ formContainerLeftActionsStyle }>
            { cancelButtonConfig ? <ActionButton { ...cancelButtonConfig } /> : <Box></Box> }
            { exportDataButtonConfig && <ActionButton { ...exportDataButtonConfig } /> }
          </Box>
          <Box>
            { submitButtonConfig && <ActionButton { ...submitButtonConfig } /> }
          </Box>
        </Box>
      </Box>
    </YodaFormProvider>
  );
};

export default FormContainer;
