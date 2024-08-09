import { ConfigService } from '../config';

export const isDefaultPhoneNumber = (phoneNumber: string): boolean => (
  ConfigService.hasValue('otp.defaultPhoneNumber')
    && ConfigService.getValue<string>('otp.defaultPhoneNumber')
      === phoneNumber
);
