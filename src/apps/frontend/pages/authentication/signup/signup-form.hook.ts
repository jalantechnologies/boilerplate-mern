import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface SignupFormProps {
  onSuccess: () => void;
  onError: (err: AsyncError) => void;
}
const useSignupForm = ({ onError, onSuccess }: SignupFormProps) => {
  const {
    isSignupLoading, signupError, signup,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email(constant.EMAIL_VALIDATION_ERROR)
        .required(constant.EMAIL_VALIDATION_ERROR),
      password: Yup.string()
        .min(constant.PASSWORD_MIN_LENGTH, constant.PASSWORD_VALIDATION_ERROR)
        .required(constant.PASSWORD_VALIDATION_ERROR),
    }),
    onSubmit: (values) => {
      signup(values.username, values.password)
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  return {
    isSignupLoading,
    signupError,
    formik,
  };
};

export default useSignupForm;
