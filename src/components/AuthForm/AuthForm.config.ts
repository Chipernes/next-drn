import useAuthFormSchema from './AuthForm.schema';
import { AuthFormConfigType } from './AuthForm.types';

const useAuthFormConfig = () => {
  const authFormSchema = useAuthFormSchema();
  const authFormConfig: AuthFormConfigType = {
    login: {
      label: 'Login',
      name: 'login',
      placeholder: 'Login...',
      required: true,
      validation: authFormSchema.login,
    },
    password: {
      label: 'Password',
      name: 'password',
      placeholder: 'Password...',
      required: true,
      validation: authFormSchema.password,
    },
  };

  return { authFormConfig };
};

export default useAuthFormConfig;
