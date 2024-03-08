import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import { SMSService } from '../../../src/apps/backend/modules/communication';
import { OtpService } from '../../../src/apps/backend/modules/otp';
import { app } from '../../helpers/app';

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

    it('should return access token for given phone number', async () => {
      const phoneNumber = {
        countryCode: '+91',
        phoneNumber: '9834567890',
      };

      sinonSandbox.stub(SMSService, <any>'sendSMS').returns(Promise.resolve(true));

      await AccountWriter.createAccountByPhoneNumber({
        countryCode: phoneNumber.countryCode,
        phoneNumber: phoneNumber.phoneNumber,
      });

      const otp = await OtpService.createOtp(phoneNumber);

      const res = await chai
        .request(app)
        .post('/api/access-tokens')
        .set('content-type', 'application/json')
        .send({
          phoneNumber,
          otpCode: otp.otpCode,
        });

      expect(res.body.token).to.be.a('string');
    });
  });
});
