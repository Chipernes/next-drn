import { YodaFieldValue } from 'yoda-ui/yodaForm/yodaForm.types';

export const authFormToBE = (data: YodaFieldValue) => {
  return {
    login: data.login,
    password: data.password,
  };
};

