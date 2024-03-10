import { useFormik } from 'formik';
import { useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import constant from '../../../constants';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface ResetPasswordFormProps {
  onSuccess: () => void;
  onError: (err: AsyncError) => void;
}

const useResetPasswordForm = ({ onError, onSuccess }: ResetPasswordFormProps) => {
  const { accountId } = useParams();

  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');

  const {
    isResetPasswordLoading, resetPasswordError, resetPassword,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      password: '',
      retypePassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(constant.PASSWORD_MIN_LENGTH, constant.PASSWORD_VALIDATION_ERROR)
        .required(constant.PASSWORD_VALIDATION_ERROR),
      retypePassword: Yup.string()
        .oneOf([Yup.ref('password')], constant.PASSWORD_MATCH_VALIDATION_ERROR)
        .required(constant.PASSWORD_MATCH_VALIDATION_ERROR),
    }),
    onSubmit: (values) => {
      resetPassword(
        accountId,
        values.password,
        token,
      )
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  return {
    formik,
    isResetPasswordLoading,
    resetPasswordError,
  };
};

export default useResetPasswordForm;
