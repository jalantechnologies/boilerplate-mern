import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface OTPFormProps {
  onError: (err: AsyncError) => void;
  onResendSuccess: () => void;
  onSuccess: () => void;
}
const useOTPForm = ({
  onError, onResendSuccess, onSuccess,
}: OTPFormProps) => {
  const {
    isVerifyOTPLoading, verifyOTPError, verifyOTPResult, sendOTP, verifyOTP,
  } = useAuthContext();

  const searchParams = new URLSearchParams(window.location.search);
  const phoneNumber = searchParams.get('ph');
  const code = searchParams.get('code');

  const formik = useFormik({
    initialValues: {
      otp: Array(4).fill(''),
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().required('')),
    }),
    onSubmit: (values) => {
      verifyOTP(`+${code}`, phoneNumber, values.otp.join(''))
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  const handleResendOTP = () => {
    sendOTP(`+${code}`, phoneNumber)
      .then(() => {
        formik.setFieldValue('otp', Array(4).fill('')).then().catch((err) => { onError(err as AsyncError); });
        onResendSuccess();
      })
      .catch((err) => {
        onResendSuccess();
        onError(err as AsyncError);
      });
  };

  return {
    code,
    formik,
    handleResendOTP,
    isVerifyOTPLoading,
    phoneNumber,
    sendOTP,
    verifyOTPError,
    verifyOTPResult,
  };
};

export default useOTPForm;
