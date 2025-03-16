// eslint-disable-next-line  @typescript-eslint/no-explicit-any
import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type YodaFieldValue = any;
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type YodaFieldValidation = any;

export type YodaField = {
  value: YodaFieldValue;
  defaultValue: YodaFieldValue;
  isValid: boolean;
  isDirty: boolean;
  showError: boolean;
  errorMessage: string | null;
  group: string | null;
  step: string | null;
  fieldLabel: string;
  validation: YodaFieldValidation;
};

export type YodaValues = {
  [key: string]: YodaFieldValue;
};

export type YodaFieldsState = {
  [key: string]: YodaField;
};

export type YodaFormState = {
  isValid: boolean;
  isDirty: boolean;
  isValidOptional?: boolean;
  showError: boolean;
};

export type YodaGroupsState = {
  [key: string]: {
    isValid: boolean;
    isDirty: boolean;
    showError: boolean;
  };
};

export type YodaStepsState = {
  [key: string]: {
    isValid: boolean;
    isDirty: boolean;
    showError: boolean;
  };
};

type YodaCommon = {
  children?: ReactNode;
  formState: YodaFormState;
  fieldsState: YodaFieldsState;
  groupsState: YodaGroupsState;
  stepsState: YodaStepsState;
};

export type YodaContextValue = YodaCommon;

export type UseYodaFormActionsProps = {
  debounceTime: number;
} & YodaCommon;

export type UseYodaFormProps = {
  createdFormState?: YodaFormState;
  createdFieldsState?: YodaFieldsState;
  createdGroupsState?: YodaGroupsState;
  createdStepsState?: YodaStepsState;
  debounceTime?: number;
};

export type SetValueActionOptions = {
  isDirtyValue?: boolean;
  showErrorValue?: boolean;
};

export type SetValueActionsProps = {
  fieldName: string;
  fieldValue: YodaFieldValue;
  defaultValue?: YodaFieldValue;
  validation?: YodaFieldValidation;
  options?: SetValueActionOptions;
};

export type SetErrorActionProps = {
  fieldName: string;
  customErrorMessage: string;
};

export type SetFieldValidationActionProps = {
  fieldName: string;
  validation: YodaFieldValidation;
};

export type TriggerFieldValidationProps = {
  fieldName: string;
  fieldValue: YodaFieldValue;
};

export type YodaCreateFormOptions = {
  debounceTime?: number;
  setIsValidOptional?: boolean;
};

export type FieldProps = {
  fieldName: string;
  defaultValue?: YodaFieldValue;
  validation?: YodaFieldValidation;
};

export function isValidId(id: YodaFieldValue): id is string | number {
  return typeof id === 'string' || typeof id === 'number';
}
