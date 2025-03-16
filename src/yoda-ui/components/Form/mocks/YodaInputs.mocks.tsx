import { ReactNode } from 'react';
import { proxy } from 'valtio';
import { YodaFormProvider } from 'yoda-ui/yodaForm/context/yodaFormProvider';
import { YodaContextValue } from 'yoda-ui/yodaForm/yodaForm.types';

export const mockContext = () => {
  const useYodaFormProps: YodaContextValue = {
    formState: proxy({ isDirty: true, isValid: true, showError: false }),
    fieldsState: proxy({}),
    stepsState: proxy({}),
    groupsState: proxy({}),
  };
  const mockYodaFormProvider = ({ children }: { children?: ReactNode }) => (
    <YodaFormProvider { ...useYodaFormProps }>
      { children }
    </YodaFormProvider>
  );
  return {
    useYodaFormProps,
    mockYodaFormProvider,
  };
};
