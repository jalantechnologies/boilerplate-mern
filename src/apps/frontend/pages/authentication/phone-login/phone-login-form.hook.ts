import { useFormik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import * as Yup from 'yup';

import constant from '../../../constants';
import { useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

interface PhoneLoginFormProps {
  onSuccess: () => void;
  onError: (err: AsyncError) => void;
}
const usePhoneLoginForm = ({ onSuccess, onError }: PhoneLoginFormProps) => {
  const {
    isSendOtpLoading, sendOtpError, sendOtp, setPhoneNumber,
  } = useAuthContext();

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
        .required('Required phone number'),
    }),
    onSubmit: (values) => {
      const validateAndFormatPhoneNumber = (phoneNumber: string, countryCode: string) => {
        try {
          const parsedPhoneNumber = PhoneNumberUtil.getInstance().parse(phoneNumber, countryCode);
          const isValid = PhoneNumberUtil.getInstance().isValidNumber(parsedPhoneNumber);
          if (!isValid) {
            onError({ message: 'Invalid phone number' } as AsyncError);
            return null;
          }
          return parsedPhoneNumber.getNationalNumber().toString();
        } catch (error) {
          onError({ message: 'Invalid phone number' } as AsyncError);
          return null;
        }
      };

      const formattedPhoneNumber = validateAndFormatPhoneNumber(values.phoneNumber, values.country);

      if (formattedPhoneNumber.length > 0) {
        setPhoneNumber({ countryCode: values.countryCode, phoneNumber: formattedPhoneNumber });
        sendOtp(values.countryCode, values.phoneNumber)
          .then(() => {
            onSuccess();
          })
          .catch((err) => {
            onError(err as AsyncError);
          });
      }
    },
  });

  return {
    formik,
    isSendOtpLoading,
    sendOtpError,
  };
};

export default usePhoneLoginForm;
