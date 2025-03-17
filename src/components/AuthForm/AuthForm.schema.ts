import { string } from 'yup';

const useAuthFormSchema = () => {
  const requiredLabel = 'This field is required';

  return {
    login: string().required(requiredLabel),
    password: string().required(requiredLabel),
  };
};

export default useAuthFormSchema;
