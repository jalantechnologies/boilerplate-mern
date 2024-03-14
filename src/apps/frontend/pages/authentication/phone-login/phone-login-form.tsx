import React from 'react';

import { Button, FormControl, Input } from '../../../components';
import { AsyncError } from '../../../types';
import { ButtonKind, ButtonType } from '../../../types/button';

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
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-4 pb-6">
          <FormControl
            label={'Phone'}
            error={formik.touched.countryCode && formik.errors.countryCode}
          >
            <CountryCodeSelect
              isLoading={isSendOTPLoading}
              value={[formik.values.countryCode, formik.values.country]}
              handleChange={handleChangeSelect}
            />
          </FormControl>
          <div className="w-full">
            <FormControl
              label={''}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            >
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
            </FormControl>
          </div>
        </div>
        <Button type={ButtonType.SUBMIT} isLoading={isSendOTPLoading} kind={ButtonKind.PRIMARY}>
          Get OTP
        </Button>
      </form>
    </>
  );
};

export default PhoneLoginForm;
