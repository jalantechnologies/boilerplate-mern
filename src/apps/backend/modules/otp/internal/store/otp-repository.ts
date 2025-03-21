import { ApplicationRepository } from '../../../application';

import { OTPDB, OTPDbSchema } from './otp-db';

const OTPRepository = ApplicationRepository<OTPDB>('otps', OTPDbSchema);

export default OTPRepository;
