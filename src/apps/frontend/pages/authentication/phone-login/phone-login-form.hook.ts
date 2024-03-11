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
        .min(8, constant.PHONE_VALIDATION_ERROR)
        .max(14, constant.PHONE_VALIDATION_ERROR)
        .required(constant.PHONE_VALIDATION_ERROR),
    }),
    onSubmit: (values) => {
      const validateAndFormatPhoneNumber = (phoneNumber: string, countryCode: string) => {
        try {
          const parsedPhoneNumber = PhoneNumberUtil.getInstance().parse(phoneNumber, countryCode);
          const isValid = PhoneNumberUtil.getInstance().isValidNumber(parsedPhoneNumber);
          if (!isValid) {
            onError({ message: constant.PHONE_VALIDATION_ERROR } as AsyncError);
            return null;
          }
          return parsedPhoneNumber.getNationalNumber().toString();
        } catch (error) {
          onError(error as AsyncError);
          return null;
        }
      };

      const formattedPhoneNumber = validateAndFormatPhoneNumber(values.phoneNumber, values.country);
      if (formattedPhoneNumber.length > 0) {
        sendOTP({ countryCode: values.countryCode, phoneNumber: formattedPhoneNumber })
          .then(() => {
            onSuccess();
            navigate(`${constants.OTP}&country_code=${values.countryCode}&phone_number=${formattedPhoneNumber}`);
          })
          .catch((err) => {
            onError(err as AsyncError);
          });
      }
    },
  });

  return {
    formik,
    isSendOTPLoading,
    sendOTPError,
  };
};

export default usePhoneLoginForm;
