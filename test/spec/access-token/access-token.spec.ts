import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import { app } from '../../helpers/app';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import { OtpService } from '../../../src/apps/backend/modules/otp';
import { SMSService } from '../../../src/apps/backend/modules/communication';

describe('AccessToken API', () => {
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });
  
  afterEach(async () => {
    sinonSandbox.restore();

    await AccountRepository.deleteMany();
  });

  describe('POST /access-tokens', () => {
    it('should return access token for given username password', async () => {
      const params = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.email(),
        password: 'password',
      };
      await AccountWriter.createAccountByUsernameAndPassword(
        params.firstName,
        params.lastName,
        params.password,
        params.username,
      );

      const res = await chai
        .request(app)
        .post('/api/access-tokens')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.body.token).to.be.a('string');
    });

    it('should return access token for given contact number', async () => {
      const contactNumber = {
        countryCode: '+91',
        phoneNumber: '9834567890',
      };

      sinonSandbox.stub(SMSService, <any>'sendSMS').returns(Promise.resolve(true));

      await AccountWriter.createAccountByContactNumber({
        countryCode: contactNumber.countryCode,
        phoneNumber: contactNumber.phoneNumber,
      });

      const otp = await OtpService.createOtp(contactNumber);

      const res = await chai
        .request(app)
        .post('/api/access-tokens')
        .set('content-type', 'application/json')
        .send({
          contactNumber,
          otpCode: otp.otpCode,
        });

      expect(res.body.token).to.be.a('string');
    });
  });
});
