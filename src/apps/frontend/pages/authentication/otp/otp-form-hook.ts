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
    isVerifyOtpLoading, verifyOtpError, verifyOtpResult, phoneNumber, sendOtp, verifyOtp,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      otp: Array(4).fill(''),
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().required('')),
    }),
    onSubmit: (values) => {
      verifyOtp(phoneNumber.countryCode, phoneNumber.phoneNumber, values.otp.join(''))
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  return {
    phoneNumber,
    formik,
    isVerifyOtpLoading,
    sendOtp,
    verifyOtpError,
    verifyOtpResult,
  };
};

export default useOtpForm;
