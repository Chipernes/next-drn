import { createContext, FC } from 'react';
import { YodaContextValue } from 'yoda-ui/yodaForm/yodaForm.types';

export const YodaFormProviderContext = createContext<YodaContextValue>({
  formState: {
    isDirty: false,
    isValid: false,
    showError: false,
  },
  fieldsState: {},
  groupsState: {},
  stepsState: {},
});

export const YodaFormProvider: FC<YodaContextValue> = ({ children, ...rest }) => (
  <YodaFormProviderContext.Provider value={ { ...rest } }>
    { children }
  </YodaFormProviderContext.Provider>
);
