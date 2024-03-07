import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface UseForgotPasswordFormProps {
  onSuccess: (username: string) => void;
  onError: (err: AsyncError) => void;
  username: string;
}

const useForgotPasswordForm = (
  { onError, onSuccess, username }: UseForgotPasswordFormProps,
) => {
  const {
    isSendForgotPasswordEmailLoading,
    sendForgotPasswordEmail,
    sendForgotPasswordEmailError,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email(constant.EMAIL_VALIDATION_ERROR)
        .required(constant.EMAIL_VALIDATION_ERROR),
    }),
    onSubmit: (values) => {
      sendForgotPasswordEmail(values.username)
        .then(() => {
          onSuccess(values.username);
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  return {
    isSendForgotPasswordEmailLoading,
    sendForgotPasswordEmailError,
    formik,
  };
};

export default useForgotPasswordForm;
