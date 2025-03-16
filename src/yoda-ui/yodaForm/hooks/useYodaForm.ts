/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext } from 'react';
import { useSnapshot } from 'valtio';
import useConst from 'hooks/useConst';
import { YodaFormProviderContext } from 'yoda-ui/yodaForm/context/yodaFormProvider';
import { useYodaFormActions } from 'yoda-ui/yodaForm/hooks/useYodaFormActions';
import {
  UseYodaFormProps,
  YodaFieldValue,
  FieldProps,
  SetValueActionOptions,
  SetValueActionsProps,
  YodaValues,
  YodaFieldValidation,
} from 'yoda-ui/yodaForm/yodaForm.types';

export const useYodaForm = ({
  createdFormState,
  createdFieldsState,
  createdGroupsState,
  createdStepsState,
  debounceTime = 300,
}: UseYodaFormProps = {}) => {
  const context = useContext(YodaFormProviderContext);

  const formState = useConst(createdFormState || context.formState);
  const fieldsState = useConst(createdFieldsState || context.fieldsState);
  const groupsState = useConst(createdGroupsState || context.groupsState);
  const stepsState = useConst(createdStepsState || context.stepsState);

  const {
    setErrorAction,
    setFormShowErrorAction,
    setStepShowErrorAction,
    setGroupShowErrorAction,
    setFieldShowErrorAction,
    setFieldValidationAction,
    setValueAction,
    setDefaultValueAction,
    setStatesAction,
    setFormIsDirtyAction,
    triggerFieldValidationAction,
  } = useYodaFormActions({ formState, fieldsState, groupsState, stepsState, debounceTime });

  const setValue = useCallback((fieldName: string, fieldValue: YodaFieldValue) => {
    setValueAction({ fieldName, fieldValue });
    setStatesAction(fieldName);
  }, [setStatesAction, setValueAction]);

  const setField = useCallback(
    ({
      fieldName,
      defaultValue,
      validation,
      options,
    }: FieldProps & { options: SetValueActionOptions }) => {
      const props: SetValueActionsProps = {
        fieldName,
        fieldValue: defaultValue !== undefined ? defaultValue : '',
        defaultValue,
        validation,
        options,
      };
      setValueAction(props);
      setDefaultValueAction(props);
      setStatesAction(fieldName);
    },
    [setValueAction, setDefaultValueAction, setStatesAction],
  );

  const registerField = useCallback((props: FieldProps) => {
    setField({
      options: { isDirtyValue: false, showErrorValue: false },
      ...props,
    });
  }, [setField]);

  const updateFieldDefaultValue = useCallback((props: FieldProps) => {
    setField({
      options: {
        isDirtyValue: fieldsState[props.fieldName].isDirty,
        showErrorValue: fieldsState[props.fieldName].showError,
      },
      ...props,
    });
  }, [fieldsState, setField]);

  const getValues = useCallback(() => {
    const values: YodaValues = {};

    if (fieldsState) {
      Object.keys(fieldsState).forEach((fieldKey) => {
        values[fieldKey] = fieldsState[fieldKey].value;
      });
    }
    return values;
  }, [fieldsState]);

  const getDirtyValues = useCallback(() => {
    const values: YodaValues = {};

    if (fieldsState) {
      Object.keys(fieldsState).forEach((fieldKey) => {
        if (fieldsState[fieldKey].isDirty === true) {
          values[fieldKey] = fieldsState[fieldKey].value;
        }
      });
    }
    return values;
  }, [fieldsState]);

  const getErrors = useCallback(() => {
    const values: YodaValues = {};
    if (fieldsState) {
      Object.keys(fieldsState).forEach((fieldKey) => {
        if (fieldsState[fieldKey].errorMessage) {
          values[fieldKey] = fieldsState[fieldKey].errorMessage;
        }
      });
    }
    return values;
  }, [fieldsState]);

  const setError = useCallback((fieldName: string, customErrorMessage: string) => {
    setErrorAction({ fieldName, customErrorMessage });
  }, [setErrorAction]);

  const setFormShowError = useCallback((value: boolean) => {
    setFormShowErrorAction(value);
  }, [setFormShowErrorAction]);

  const setStepShowError = useCallback((value: boolean, steps: string[]) => {
    setStepShowErrorAction(value, steps);
  }, [setStepShowErrorAction]);

  const setGroupShowError = useCallback((value: boolean, groups: string[]) => {
    setGroupShowErrorAction(value, groups);
  }, [setGroupShowErrorAction]);

  const setFieldShowError = useCallback((value: boolean, fields: string[]) => {
    setFieldShowErrorAction(value, fields);
  }, [setFieldShowErrorAction]);

  const setFieldValidation = useCallback((fieldName: string, validation: YodaFieldValidation) => {
    setFieldValidationAction({ fieldName, validation });
  }, [setFieldValidationAction]);

  const triggerFieldValidation = useCallback((fieldName: string, fieldValue: YodaFieldValue) => {
    triggerFieldValidationAction({ fieldName, fieldValue });
  }, [triggerFieldValidationAction]);

  const setDefaultValue = useCallback((fieldName: string, fieldValue: YodaFieldValue) => {
    setDefaultValueAction({ fieldName, fieldValue });
  }, [setDefaultValueAction]);

  const resetForm = useCallback(() => {
    Object.keys(fieldsState).forEach((key) => {
      const { defaultValue, validation } = fieldsState[key];
      registerField({
        fieldName: key,
        defaultValue,
        validation,
      });
    });
  }, [fieldsState, registerField]);

  const resetField = useCallback((fieldName: any) => {
    const { defaultValue, validation } = fieldsState[fieldName];
    registerField({
      fieldName,
      defaultValue,
      validation,
    });
  }, [fieldsState, registerField]);

  const setFormIsDirty = useCallback((value: boolean) => {
    setFormIsDirtyAction(value);
  }, [setFormIsDirtyAction]);

  const useWatchField = (fieldName: string) => useSnapshot(fieldsState)[fieldName];
  const useWatchGroup = (groupName: string) => useSnapshot(groupsState)[groupName];
  const useWatchStep = (stepName: string) => useSnapshot(stepsState)[stepName];
  const useWatchForm = () => useSnapshot(formState);

  return {
    formState,
    stepsState,
    groupsState,
    fieldsState,

    setValue,
    setError,

    setFormShowError,
    setStepShowError,
    setGroupShowError,
    setFieldShowError,
    setDefaultValue,

    setFormIsDirty,

    useWatchField,
    useWatchGroup,
    useWatchStep,
    useWatchForm,

    getValues,
    getDirtyValues,
    getErrors,

    resetForm,
    resetField,
    registerField,
    setFieldValidation,
    triggerFieldValidation,
    updateFieldDefaultValue,
  };
};
