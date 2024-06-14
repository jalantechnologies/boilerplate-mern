import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import { AccountNotFoundError, AccountWithUserNameExistsError, PhoneNumber } from '../../../src/apps/backend/modules/account';
import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import { SMSService } from '../../../src/apps/backend/modules/communication';
import { app } from '../../helpers/app';

describe('Account API', () => {
  let sinonSandbox: sinon.SinonSandbox;
  let sendSMSStub: sinon.SinonStub;

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();

    sendSMSStub = sinonSandbox
      .stub(SMSService, 'sendSMS')
      .returns(Promise.resolve());
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

    it('should create a new account if it does not exist and send OTP when a user signs up through the phone number', async () => {
      const phoneNumber = {
        countryCode: '+91',
        phoneNumber: '7895586769',
      };

      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send({
          phoneNumber,
        });

      expect(res.status).to.be.eq(201);
      expect(res.body.phoneNumber.countryCode).to.eq(phoneNumber.countryCode);
      expect(res.body.phoneNumber.phoneNumber).to.eq(phoneNumber.phoneNumber);
      expect(sendSMSStub.calledOnce).to.be.true;
    });

    it('should send OTP for the already existing account when a user signs up through the phone number', async () => {
      const phoneNumber = {
        countryCode: '+91',
        phoneNumber: '7895586769',
      };

      const account = await AccountWriter.createAccountByPhoneNumber(
        new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber),
      );

      const createAccountByPhoneNumberStub = sinonSandbox
        .stub(AccountWriter, 'createAccountByPhoneNumber')
        .returns(Promise.resolve(account));

      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send({
          phoneNumber,
        });

      expect(res.status).to.be.eq(201);
      expect(res.body.phoneNumber.countryCode).to.eq(phoneNumber.countryCode);
      expect(res.body.phoneNumber.phoneNumber).to.eq(phoneNumber.phoneNumber);
      expect(sendSMSStub.calledOnce).to.be.true;
      expect(createAccountByPhoneNumberStub.calledOnce).to.be.false;
    });

    it('should throw an error when creating a new account with an invalid phone number', async () => {
      const phoneNumber = {
        countryCode: '+1',
        phoneNumber: '7895586',
      };

      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send({
          phoneNumber,
        });

      expect(res.status).to.be.eq(400);
      expect(res.body.message).to.eq('Please provide a valid phone number.');
      expect(sendSMSStub.calledOnce).to.be.false;
    });
  });

  describe('PATCH /accounts/:accountId', () => {
    it('should update account details', async () => {
      const account = await AccountWriter.createAccountByUsernameAndPassword(
        faker.name.firstName(),
        faker.name.lastName(),
        'password',
        faker.internet.userName(),
      );

      const updateAccountDetailsParams = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${account.id}`)
        .set('content-type', 'application/json')
        .send(updateAccountDetailsParams);

      expect(res.status).to.be.eq(200);
      expect(res.body.firstName).to.eq(updateAccountDetailsParams.firstName);
      expect(res.body.lastName).to.eq(updateAccountDetailsParams.lastName);
      expect(res.body.firstName).to.not.eq(account.firstName);
      expect(res.body.lastName).to.not.eq(account.lastName);
    });

    it('should throw an error when updating account details with an account ID that does not exist', async () => {
      const accountId = faker.database.mongodbObjectId();
      const updateAccountDetailsParams = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${accountId}`)
        .set('content-type', 'application/json')
        .send(updateAccountDetailsParams);

      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new AccountNotFoundError(accountId).message,
      );
    });
  });
});
