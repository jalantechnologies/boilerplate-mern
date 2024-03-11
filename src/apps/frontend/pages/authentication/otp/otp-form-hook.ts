import { useFormik } from 'formik';
import * as Yup from 'yup';

import constant from '../../../constants';
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
  const phoneNumber = searchParams.get('phone_number');
  const countryCode = searchParams.get('country_code');

  const formik = useFormik({
    initialValues: {
      otp: Array(constant.OTP_LENGTH).fill(''),
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().required('')),
    }),
    onSubmit: (values) => {
      verifyOTP({ countryCode: `+${countryCode}`, phoneNumber }, values.otp.join(''))
        .then(() => {
          onSuccess();
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  const handleResendOTP = () => {
    sendOTP({ countryCode: `+${countryCode}`, phoneNumber })
      .then(() => {
        formik.setFieldValue('otp', Array(constant.OTP_LENGTH).fill('')).then().catch((err) => { onError(err as AsyncError); });
        onResendSuccess();
      })
      .catch((err) => {
        onError(err as AsyncError);
      });
  };

  return {
    countryCode,
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
