import { ApplicationRepository } from 'backend/modules/application';
import {
  OTPDB,
  OTPDbSchema,
} from 'backend/modules/authentication/internals/otp/store/otp-db';

const OTPRepository = ApplicationRepository<OTPDB>('otps', OTPDbSchema);

export default OTPRepository;
