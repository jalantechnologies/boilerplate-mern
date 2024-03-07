import React from 'react';

import { FormControl, Input } from '../../../components';
import COUNTRY_CODE from '../../../constants/country-code';
import { AsyncError } from '../../../types';

import useLoginWithPhoneForm from './login-with-phone-form.hook';

interface LoginWithPhoneFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const LoginWithPhoneForm: React.FC<LoginWithPhoneFormProps> = ({ onError, onSuccess }) => {
  const { formik, isLoginLoading } = useLoginWithPhoneForm({ onSuccess, onError });

  return (
    <div className="w-full xl:w-2/5">
      <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
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
                <select name="countryCode" value={formik.values.countryCode} onChange={formik.handleChange} className='w-44 items-center justify-center rounded-lg border bg-transparent px-2 py-4 text-lg outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                  {
                    COUNTRY_CODE.map((item, index) => (
                    <option
                    key={index} value={item.code}>
                      <p>{item.flag}</p>
                      <p> {item.country} ({item.code})</p>
                    </option>
                    ))
                  }
                </select>
                <Input
                  data-testid="phoneNumber"
                  disabled={isLoginLoading}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  type={'number'}
                  value={formik.values.phoneNumber}
                />
              </div>
            </FormControl>
          </div>

          <button
            className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90
              ${isLoginLoading && 'cursor-not-allowed bg-primary/90'}`}
            disabled={isLoginLoading}
            type="submit"
          >
            Get OTP
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginWithPhoneForm;
