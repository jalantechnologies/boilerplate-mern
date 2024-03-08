import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import React from 'react';

import { FormControl, Input } from '../../../components';
import { AsyncError } from '../../../types';

import CountryCodeSelect from './country-code-select';
import usePhoneLoginForm from './phone-login-form.hook';

interface PhoneLoginFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({ onError, onSuccess }) => {
  const { formik, isSendOtpLoading } = usePhoneLoginForm({ onSuccess, onError });

  const setFormikFieldValue = (firstName: string, data: string) => {
    formik.setFieldValue(firstName, data)
      .then(() => {}).catch((err) => { onError(err as AsyncError); });
  };

  const handleChangePhone = (e) => {
    const val = e.target.value as string;
    if (!/[a-z]/gi.test(val)) {
      if (formik.values.phoneNumber.length > 3) {
        const parsedPhoneNumber = PhoneNumberUtil.getInstance().parse(val, formik.values.country);
        const formattedPhoneNumber: string = PhoneNumberUtil.getInstance().format(
          parsedPhoneNumber, PhoneNumberFormat.NATIONAL,
        );
        setFormikFieldValue('phoneNumber', formattedPhoneNumber);
      } else setFormikFieldValue('phoneNumber', val);
    }
  };

  const handleChangeSelect = (e) => {
    const val = e.target.value as string;
    const [code, country] = val.split(',');
    setFormikFieldValue('country', country);
    setFormikFieldValue('countryCode', code);
    setFormikFieldValue('phoneNumber', '');
  };

  return (
      <>
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Log In
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <FormControl
              label={'Phone'}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            >
              <div className="flex gap-5">
                <CountryCodeSelect
                  isLoading={isSendOtpLoading}
                  value={[formik.values.countryCode, formik.values.country]}
                  handleChange={handleChangeSelect}
                />
                <Input
                  data-testid="phoneNumber"
                  disabled={isSendOtpLoading}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChangePhone}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  value={formik.values.phoneNumber}
                />
              </div>
            </FormControl>
          </div>

          <button
            className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90
              ${isSendOtpLoading && 'cursor-not-allowed bg-primary/90'}`}
            disabled={isSendOtpLoading}
            type="submit"
          >
            Get OTP
          </button>
        </form>
      </>
  );
};
export default PhoneLoginForm;
