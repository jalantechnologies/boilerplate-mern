import { ApplicationRepository } from 'modules/application';
import {
  OTPDB,
  OTPDbSchema,
} from 'modules/authentication/internals/otp/store/otp-db';

const OTPRepository = ApplicationRepository<OTPDB>('otps', OTPDbSchema);

export default OTPRepository;
