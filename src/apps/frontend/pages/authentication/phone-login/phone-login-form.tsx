import React from 'react';

import { FormControl, Input } from '../../../components';
import { AsyncError } from '../../../types';

import CountryCodeSelect from './country-code-select';
import usePhoneLoginForm from './phone-login-form.hook';

interface PhoneLoginFormProps {
  onSendOTPSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({ onError, onSendOTPSuccess }) => {
  const { formik, isSendOTPLoading } = usePhoneLoginForm({ onSendOTPSuccess, onError });

  const setFormikFieldValue = (fieldName: string, data: string) => {
    formik.setFieldValue(fieldName, data)
      .then().catch((err) => { onError(err as AsyncError); });
  };

  const handleChangePhone = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setFormikFieldValue('phoneNumber', value);
  };

  const handleChangeSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    const [countryCode, country] = value.split(',');
    setFormikFieldValue('country', country);
    setFormikFieldValue('countryCode', countryCode);
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
                  isLoading={isSendOTPLoading}
                  value={[formik.values.countryCode, formik.values.country]}
                  handleChange={handleChangeSelect}
                />
                <Input
                  data-testid="phoneNumber"
                  disabled={isSendOTPLoading}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChangePhone}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  type='number'
                  value={formik.values.phoneNumber}
                />
              </div>
            </FormControl>
          </div>

          <button
            className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90
              ${isSendOTPLoading && 'cursor-not-allowed bg-primary/90'}`}
            disabled={isSendOTPLoading}
            type="submit"
          >
            Get OTP
          </button>
        </form>
      </>
  );
};
export default PhoneLoginForm;
