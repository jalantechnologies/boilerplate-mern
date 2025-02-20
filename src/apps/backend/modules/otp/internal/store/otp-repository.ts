import { ApplicationRepository } from '../../../application';

import { OtpDB, OtpDbSchema } from './otp-db';

const OtpRepository = ApplicationRepository<OtpDB>('otps', OtpDbSchema);

export default OtpRepository;
