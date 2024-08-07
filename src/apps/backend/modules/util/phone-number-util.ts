import { ConfigService } from '../config';

export const isDefaultPhoneNumber = (phoneNumber: string): boolean => (
  ConfigService.hasValue('defaultPhoneNumber')
    && ConfigService.getValue<string>('defaultPhoneNumber')
      === phoneNumber
);
