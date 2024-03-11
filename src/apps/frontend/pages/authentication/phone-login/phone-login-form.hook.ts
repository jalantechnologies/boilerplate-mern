import { useFormik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import constant from '../../../constants';
import constants from '../../../constants/routes';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface PhoneLoginFormProps {
  onSuccess: () => void;
  onError: (err: AsyncError) => void;
}
const usePhoneLoginForm = ({ onSuccess, onError }: PhoneLoginFormProps) => {
  const {
    isSendOTPLoading, sendOTPError, sendOTP,
  } = useAuthContext();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      countryCode: '+1',
      country: 'US',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .required(constant.PHONE_VALIDATION_ERROR),
    }),
    onSubmit: (values) => {
      const parsedPhoneNumber = PhoneNumberUtil.getInstance().parse(
        values.phoneNumber, values.country,
      );
      const isValidPhoneNumber = PhoneNumberUtil.getInstance().isValidNumber(parsedPhoneNumber);

      if (!isValidPhoneNumber) {
        onError({ message: constant.PHONE_VALIDATION_ERROR } as AsyncError);
        return;
      }

      const formattedPhoneNumber = parsedPhoneNumber.getNationalNumber().toString();
      const otpPageUrl = `${constants.OTP}&country_code=${values.countryCode}&phone_number=${formattedPhoneNumber}`;
      sendOTP({ countryCode: values.countryCode, phoneNumber: formattedPhoneNumber })
        .then(() => {
          onSuccess();
          navigate(otpPageUrl);
        })
        .catch((err) => {
          onError(err as AsyncError);
        });
    },
  });

  return {
    formik,
    isSendOTPLoading,
    sendOTPError,
  };
};

export default usePhoneLoginForm;
