import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  VerticalStackLayout,
} from '../../../components';
import COUNTRY_SELECT_OPTIONS from '../../../constants/countries';
import routes from '../../../constants/routes';
import { getConfigValue } from '../../../helpers/config';
import { AsyncError, LoginMethod } from '../../../types';
import { ButtonKind, ButtonSize, ButtonType } from '../../../types/button';

import usePhoneLoginForm from './phone-login-form.hook';

interface PhoneLoginFormProps {
  onSendOTPSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const PhoneLoginForm: React.FC<PhoneLoginFormProps> = ({
  onError,
  onSendOTPSuccess,
}) => {
  const currentLoginMethod = getConfigValue('currentLoginMethod');
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (currentLoginMethod === LoginMethod.EMAIL) {
      navigate(routes.LOGIN);
    }
  }, [currentLoginMethod, navigate]);

  const { formik, isSendOTPLoading } = usePhoneLoginForm({
    onSendOTPSuccess,
    onError,
  });

  const setFormikFieldValue = (fieldName: string, data: string) => {
    formik
      .setFieldValue(fieldName, data)
      .then()
      .catch((err) => {
        onError(err as AsyncError);
      });
  };

  const handleChangePhone = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setFormikFieldValue('phoneNumber', value);
  };

  const handleChangeSelect = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    const [countryCode, country] = value.split(', ');
    setFormikFieldValue('country', country);
    setFormikFieldValue('countryCode', countryCode);
    setFormikFieldValue('phoneNumber', '');
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <VerticalStackLayout gap={5}>
        <Flex gap={4}>
          <FormControl
            label={'Phone'}
            error={formik.touched.countryCode && formik.errors.countryCode}
          >
            <Select
              handleChange={handleChangeSelect}
              isLoading={isSendOTPLoading}
              options={COUNTRY_SELECT_OPTIONS}
              value={`${formik.values.countryCode}, ${formik.values.country}`}
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
                type="number"
                value={formik.values.phoneNumber}
              />
            </FormControl>
          </div>
        </Flex>
        <Button
          isLoading={isSendOTPLoading}
          kind={ButtonKind.PRIMARY}
          size={ButtonSize.LARGE}
          type={ButtonType.SUBMIT}
        >
          Get OTP
        </Button>
      </VerticalStackLayout>
    </form>
  );
};

export default PhoneLoginForm;
