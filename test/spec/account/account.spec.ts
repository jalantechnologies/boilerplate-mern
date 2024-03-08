import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import { AccountWithUserNameExistsError } from '../../../src/apps/backend/modules/account';
import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import { SMSService } from '../../../src/apps/backend/modules/communication';
import { app } from '../../helpers/app';

describe('Account API', () => {
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  describe('POST /accounts', () => {
    it('should create a new account', async () => {
      const params = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: 'password',
      };
      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.status).to.be.eq(201);
      expect(res.body.username).to.eq(params.username);
    });

    it('should throw error if account with username already exists', async () => {
      const params = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
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
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.status).to.be.eq(409);
      expect(res.body.message).to.eq(
        new AccountWithUserNameExistsError(params.username).message,
      );
    });

    it('should create a new account if it does not exist and send otp when user signing up through contact number ', async () => {
      const contactNumber = {
        countryCode: '+91',
        phoneNumber: '7895586769',
      };

      const sendSMSStub = sinonSandbox.stub(SMSService, <any>'sendSMS').returns(Promise.resolve(true));

      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send({
          contactNumber,
        });

      expect(res.status).to.be.eq(201);
      expect(res.body.contactNumber.countryCode).to.eq(contactNumber.countryCode);
      expect(res.body.contactNumber.phoneNumber).to.eq(contactNumber.phoneNumber);
      expect(sendSMSStub.calledOnce).to.be.true;
    });

    it('should send otp if account already exists when user signing up through contact number', async () => {
      const contactNumber = {
        countryCode: '+91',
        phoneNumber: '7895586769',
      };

      await AccountWriter.createAccountByContactNumber(contactNumber);

      const createAccountByContactNumberStub = sinonSandbox.stub(AccountWriter, <any>'createAccountByContactNumber').returns(Promise.resolve(true));
      const sendSMSStub = sinonSandbox.stub(SMSService, <any>'sendSMS').returns(Promise.resolve(true));

      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send({
          contactNumber,
        });

      expect(res.status).to.be.eq(201);
      expect(res.body.contactNumber.countryCode).to.eq(contactNumber.countryCode);
      expect(res.body.contactNumber.phoneNumber).to.eq(contactNumber.phoneNumber);
      expect(sendSMSStub.calledOnce).to.be.true;
      expect(createAccountByContactNumberStub.calledOnce).to.be.false;
    });

    it('should throw error when creating a new account with invalid contact number', async () => {
      const contactNumber = {
        countryCode: '+1',
        phoneNumber: '7895586',
      };

      const sendSMSStub = sinonSandbox.stub(SMSService, <any>'sendSMS').returns(Promise.resolve(true));

      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send({
          contactNumber,
        });

      expect(res.status).to.be.eq(500);
      expect(res.body.message).to.eq('Invalid contact number');
      expect(sendSMSStub.calledOnce).to.be.false;
    });
  });
});
