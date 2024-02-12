import React, { useState } from 'react';

import { AsyncError } from '../../../types';

import useLoginForm from './login-form.hook';

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onError, onSuccess }) => {
  const { formik, isLoginLoading } = useLoginForm({ onSuccess, onError });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
      <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Sign In
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  formik.touched.username && formik.errors.username
                    ? 'border-red-500'
                    : ''
                }`}
                data-testid="username"
                disabled={isLoginLoading}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your email"
                value={formik.values.username}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <div className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : ''
                }`}
                data-testid="password"
                disabled={isLoginLoading}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={formik.values.password}
              />

              <button
                className="absolute inset-y-0 right-0 flex items-center px-4"
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility();
                }}
              >
                {isPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-5">
            <input
              disabled={isLoginLoading}
              type="submit"
              value="Sign In"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
