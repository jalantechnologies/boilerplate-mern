import { ApplicationRepository } from '../../../application';

import { OtpDB, OtpDbSchema } from './otp-db';

const OtpRepository = ApplicationRepository<OtpDB>(
  'Otp',
  OtpDbSchema,
);

export default OtpRepository;
