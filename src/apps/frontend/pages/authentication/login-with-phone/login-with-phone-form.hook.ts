import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface LoginFormProps {
  onSuccess: () => void;
  onError: (err: AsyncError) => void;
}
const useLoginWithPhoneForm = ({ onError, onSuccess }: LoginFormProps) => {
  const {
    isLoginLoading, sendOTP,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      countryCode: '+1',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .min(10, constant.PHONE_VALIDATION_ERROR)
        .max(10, constant.PHONE_VALIDATION_ERROR)
        .required('Required phone number'),
    }),
    onSubmit: (values) => {
      sendOTP(values.countryCode, values.phoneNumber)
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
    formik,
  };
};

export default useLoginWithPhoneForm;
