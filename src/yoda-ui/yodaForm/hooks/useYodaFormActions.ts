/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import isEqual from 'lodash/isEqual';
import { useCallback } from 'react';
import { defaultYodaField } from 'yoda-ui/yodaForm/yodaForm.const';
import {
  SetErrorActionProps,
  SetFieldValidationActionProps,
  SetValueActionsProps,
  TriggerFieldValidationProps,
  UseYodaFormActionsProps,
  YodaFieldsState,
  YodaFieldValidation,
  YodaFieldValue,
  YodaGroupsState,
  YodaStepsState,
} from 'yoda-ui/yodaForm/yodaForm.types';

export const useYodaFormActions = ({
  formState,
  fieldsState,
  groupsState,
  stepsState,
}: UseYodaFormActionsProps) => {
  const getFieldNameParts = (fieldName: string) => {
    const fieldArray = fieldName.split('.');
    const group = fieldArray.length > 2 ? fieldArray[1] : null;
    const step = fieldArray.length > 1 ? fieldArray[0] : null;
    const fieldLabel = fieldArray[fieldArray.length - 1];
    return { fieldLabel, group, step };
  };

  const getFieldsInsideGroup = useCallback((groupName: string) => {
    const childrenFields: string[] = [];

    Object.keys(fieldsState).forEach((fieldName) => {
      const { group } = getFieldNameParts(fieldName);
      if (group === groupName) {
        childrenFields.push(fieldName);
      }
    });
    return childrenFields;
  }, [fieldsState]);

  const getFieldsAndGroupsInsideStep = useCallback((stepName: string) => {
    const childrenFields: string[] = [];
    const childrenGroupsSet: Set<string> = new Set();

    Object.keys(fieldsState).forEach((fieldName) => {
      const { group, step } = getFieldNameParts(fieldName);
      if (step === stepName) {
        childrenFields.push(fieldName);
        if (group) {
          childrenGroupsSet.add(group);
        }
      }
    });
    return {
      childrenFields,
      childrenGroups: Array.from(childrenGroupsSet),
    };
  }, [fieldsState]);

  const initializeField = useCallback(({
    fieldName,
    defaultValue,
    validation = null,
  }: { fieldName: string; defaultValue?: YodaFieldValue; validation?: YodaFieldValidation }) => {
    const { fieldLabel, group, step } = getFieldNameParts(fieldName);

    // Create field
    fieldsState[fieldName] = {
      ...defaultYodaField,
      defaultValue: defaultValue || '',
      validation,
      group,
      step,
      fieldLabel,
    };

    // Create or update group
    if (group && !groupsState[group]) {
      groupsState[group] = {
        isDirty: false,
        isValid: false,
        showError: false,
      };
    }

    // Create step
    if (step && !stepsState[step]) {
      stepsState[step] = {
        isDirty: false,
        isValid: false,
        showError: false,
      };
    }
  }, [groupsState, stepsState, fieldsState]);

  const validateField = useCallback((fieldName: YodaFieldValue, fieldValue: YodaFieldValue) => {
    const { validation } = fieldsState[fieldName];
    if (!validation) {
      return null;
    }
    try {
      validation.validateSync(fieldValue, { fieldsState });
      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return null;
    }
  }, [fieldsState]);

  const setStatesAction = useCallback(
    (fieldName: string) => {
      const { group: groupName, step: stepName } = getFieldNameParts(fieldName);
      const form = { isDirty: false, isValid: true };
      const step = { isDirty: false, isValid: true };
      const group = { isDirty: false, isValid: true };

      Object.keys(fieldsState).forEach((fieldKey) => {
        const field = fieldsState[fieldKey];
        if (field.errorMessage) {
          form.isValid = false;
          if (groupName && field.group === groupName) {
            group.isValid = false;
          }
          if (stepName && field.step === stepName) {
            step.isValid = false;
          }
        }
        if (field.isDirty) {
          form.isDirty = true;
          if (groupName && field.group === groupName) {
            group.isDirty = true;
          }
          if (stepName && field.step === stepName) {
            step.isDirty = true;
          }
        }
      });
      formState.isValid = form.isValid;
      formState.isDirty = form.isDirty;

      if (groupName) {
        groupsState[groupName].isDirty = group.isDirty;
        groupsState[groupName].isValid = group.isValid;
      }
      if (stepName) {
        stepsState[stepName].isDirty = step.isDirty;
        stepsState[stepName].isValid = step.isValid;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const setValueAction = useCallback(({ fieldName, fieldValue, defaultValue, options, validation }: SetValueActionsProps) => {
    const fieldExists = fieldsState[fieldName] !== undefined;
    if (!fieldExists) {
      initializeField({ fieldName, defaultValue, validation });
    }

    const { isDirtyValue, showErrorValue } = options || {};
    const { value: currentFieldValue } = fieldsState[fieldName];
    const isSameValue = isEqual(fieldValue, currentFieldValue);
    const isSameDefaultValue = isEqual(fieldValue, defaultValue);

    fieldsState[fieldName].value = fieldValue;

    if (isDirtyValue === undefined) {
      fieldsState[fieldName].isDirty = !(isSameValue || isSameDefaultValue);
    } else {
      fieldsState[fieldName].isDirty = isDirtyValue;
    }

    const error = validateField(fieldName, fieldValue);
    fieldsState[fieldName].errorMessage = error;
    fieldsState[fieldName].isValid = !error;
    fieldsState[fieldName].showError = showErrorValue !== undefined ? showErrorValue : !!error;
  }, [validateField, fieldsState, initializeField]);

  const setDefaultValueAction = useCallback(({ fieldName, defaultValue }: SetValueActionsProps) => {
    fieldsState[fieldName].defaultValue = defaultValue;
  }, [fieldsState]);

  const setErrorAction = useCallback(({ fieldName, customErrorMessage }: SetErrorActionProps) => {
    if (!fieldsState[fieldName]) {
      return;
    }
    fieldsState[fieldName].errorMessage = customErrorMessage;
    fieldsState[fieldName].isValid = false;
    setStatesAction(fieldName);
  }, [fieldsState, setStatesAction]);

  const triggerFieldValidationAction = useCallback(({ fieldName, fieldValue }: TriggerFieldValidationProps) => {
    if (!fieldsState[fieldName]) {
      return;
    }
    const error = validateField(fieldName, fieldValue);
    fieldsState[fieldName].errorMessage = error;
    fieldsState[fieldName].isValid = !error;
    setStatesAction(fieldName);
  }, [fieldsState, setStatesAction, validateField]);

  const setFieldValidationAction = useCallback(({ fieldName, validation }: SetFieldValidationActionProps) => {
    if (!fieldsState[fieldName]) {
      return;
    }
    fieldsState[fieldName].validation = validation;
  }, [fieldsState]);

  const updateShowErrorProp = (
    targetList: string[],
    state: YodaFieldsState | YodaGroupsState | YodaStepsState,
    value: boolean,
  ) => {
    targetList.forEach((targetName) => {
      if (state[targetName]) {
        state[targetName].showError = value;
      }
    });
  };

  const updateIsDirtyProp = (
    targetList: string[],
    state: YodaFieldsState | YodaGroupsState | YodaStepsState,
    value: boolean,
  ) => {
    targetList.forEach((targetName) => {
      if (state[targetName]) {
        state[targetName].isDirty = value;
      }
    });
  };

  const setFormShowErrorAction = useCallback((value: any) => {
    formState.showError = value;
    updateShowErrorProp(Object.keys(fieldsState), fieldsState, value);
    updateShowErrorProp(Object.keys(groupsState), groupsState, value);
    updateShowErrorProp(Object.keys(stepsState), stepsState, value);
  }, [fieldsState, groupsState, stepsState, formState]);

  const setStepShowErrorAction = useCallback((value: any, targetSteps: string[] = []) => {
    updateShowErrorProp(targetSteps, stepsState, value);

    const targetChildrenFields: string[] = [];
    const targetChildrenGroups: string[] = [];
    targetSteps.forEach((stepName: string) => {
      const { childrenFields, childrenGroups } = getFieldsAndGroupsInsideStep(stepName);
      targetChildrenFields.push(...childrenFields);
      targetChildrenGroups.push(...childrenGroups);
    });

    updateShowErrorProp(targetChildrenGroups, groupsState, value);
    updateShowErrorProp(targetChildrenFields, fieldsState, value);
  }, [fieldsState, groupsState, stepsState, getFieldsAndGroupsInsideStep]);

  const setGroupShowErrorAction = useCallback((value: any, targetGroups: string[] = []) => {
    updateShowErrorProp(targetGroups, groupsState, value);

    const targetChildrenFields: string[] = [];
    targetGroups.forEach((groupName: string) => {
      targetChildrenFields.push(...getFieldsInsideGroup(groupName));
    });

    updateShowErrorProp(targetChildrenFields, fieldsState, value);
  }, [fieldsState, groupsState, getFieldsInsideGroup]);

  const setFieldShowErrorAction = useCallback((value: any, targetFields: string[] = []) => {
    updateShowErrorProp(targetFields, fieldsState, value);
  }, [fieldsState]);

  const setFormIsDirtyAction = useCallback((value: any) => {
    formState.isDirty = value;
    updateIsDirtyProp(Object.keys(fieldsState), fieldsState, value);
    updateIsDirtyProp(Object.keys(groupsState), groupsState, value);
    updateIsDirtyProp(Object.keys(stepsState), stepsState, value);
  }, [fieldsState, groupsState, stepsState, formState]);

  return {
    setErrorAction,
    setFormShowErrorAction,
    setStepShowErrorAction,
    setGroupShowErrorAction,
    setFieldShowErrorAction,
    setFieldValidationAction,
    setValueAction,
    setDefaultValueAction,
    validateField,
    initializeField,
    setStatesAction,
    setFormIsDirtyAction,
    triggerFieldValidationAction,
  };
};
