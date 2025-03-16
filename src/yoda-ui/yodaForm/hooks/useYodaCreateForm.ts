import { proxy } from 'valtio';
import { useYodaForm } from './useYodaForm';
import useConst from 'hooks/useConst';
import {
  YodaCreateFormOptions,
  YodaFormState,
  YodaFieldsState,
  YodaGroupsState,
  YodaStepsState,
} from 'yoda-ui/yodaForm/yodaForm.types';

export const useYodaCreateForm = (options?: YodaCreateFormOptions) => {
  const formState = useConst<YodaFormState>(proxy({
    isValid: false,
    isDirty: false,
    isValidOptional: options?.setIsValidOptional || false,
    showError: false,
  }));
  const fieldsState = useConst<YodaFieldsState>(proxy({}));
  const groupsState = useConst<YodaGroupsState>(proxy({}));
  const stepsState = useConst<YodaStepsState>(proxy({}));

  const yodaMethods = useYodaForm({
    createdFormState: formState,
    createdFieldsState: fieldsState,
    createdGroupsState: groupsState,
    createdStepsState: stepsState,
    debounceTime: options?.debounceTime,
  });

  const providerFields = {
    formState,
    fieldsState,
    groupsState,
    stepsState,
  };

  return {
    ...yodaMethods,
    formState,
    fieldsState,
    stepsState,
    groupsState,
    providerFields,
  };
};
