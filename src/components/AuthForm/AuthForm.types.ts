import { TextYodaInputProps } from 'yoda-ui/components/Form/TextYoda';

export type AuthFormSubmitCallbackType = (userData: AuthFormType) => void;
export type AuthFormCancelCallbackType = () => void;

export type AuthFormPropsType = {
  submitCallback: AuthFormSubmitCallbackType;
  cancelCallback: AuthFormCancelCallbackType;
};

export type AuthFormConfigType = {
  login: TextYodaInputProps;
  password: TextYodaInputProps;
};

export type AuthFormType = {
  login: string;
  password: string;
};
