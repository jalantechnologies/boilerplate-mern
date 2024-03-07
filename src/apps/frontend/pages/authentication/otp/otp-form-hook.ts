import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface OtpFormProps {
  onSuccess: () => void;
  onError: (err: AsyncError) => void;
}
const useOtpForm = ({ onError, onSuccess }: OtpFormProps) => {
  const {
    isLoginLoading, sendOTP, verifyOTP,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      otp: Array(6).fill(''),
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().required('')),
    }),
    onSubmit: (values) => {
      // authRecordId Part of Backend Integration
      const authRecordId = '';
      verifyOTP(authRecordId, values.otp.join(''))
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
    isLoginLoading,
    sendOTP,
  };
};

export default useOtpForm;
