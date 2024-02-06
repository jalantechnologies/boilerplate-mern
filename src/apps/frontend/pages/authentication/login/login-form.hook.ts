import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface LoginFormProps {
  onSuccess: () => void;
  onError: (err: AsyncError) => void;
}
const useLoginForm = ({ onError, onSuccess }: LoginFormProps) => {
  const {
    isLoginLoading, signIn, loginError, loginResult,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email(constant.EMAIL_VALIDATION_ERROR)
        .required('Required'),
      password: Yup.string()
        .min(constant.PASSWORD_MIN_LENGTH, constant.PASSWORD_VALIDATION_ERROR)
        .required('Required'),
    }),
    onSubmit: (values) => {
      signIn(values.username, values.password)
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  return {
    isLoginLoading,
    loginError,
    loginResult,
    formik,
  };
};

export default useLoginForm;
