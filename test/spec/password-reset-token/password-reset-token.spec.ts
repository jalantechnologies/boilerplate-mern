import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import {
  Account, AccountBadRequestError, AccountNotFoundError, ResetPasswordParams,
} from '../../../src/apps/backend/modules/account';
import AccountUtil from '../../../src/apps/backend/modules/account/internal/account-util';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import { EmailService } from '../../../src/apps/backend/modules/communication';
import { PasswordResetTokenNotFoundError, PasswordResetTokenService } from '../../../src/apps/backend/modules/password-reset-token';
import PasswordResetTokenUtil from '../../../src/apps/backend/modules/password-reset-token/internal/password-reset-token-util';
import PasswordResetTokenRepository from '../../../src/apps/backend/modules/password-reset-token/internal/store/password-reset-token-repository';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

describe('Account Password Reset', () => {
  let sinonSandbox: sinon.SinonSandbox;
  let account: Account;

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
    ({ account } = await createAccount());
  });

  afterEach(async () => {
    sinonSandbox.restore();
    await AccountRepository.deleteOne({
      _id: account.id,
    });
  });

  describe('POST /password-reset-token', () => {
    it('should create a new password reset token and send an email with password reset link, if enabled for the env', async () => {
      expect(
        await PasswordResetTokenRepository.findOne({
          account: account.id,
        }),
      ).to.not.exist;

      const passwordResetTokenparams = {
        username: account.username,
      };

      const stubEmailService = sinonSandbox.stub(EmailService, 'sendEmail');

      const resetToken = faker.random.alphaNumeric();
      sinonSandbox.stub(PasswordResetTokenUtil, 'generatePasswordResetToken').returns(resetToken);

      const res = await chai
        .request(app)
        .post('/api/password-reset-token')
        .set('content-type', 'application/json')
        .send(passwordResetTokenparams);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('account');
      expect(res.body).to.have.property('token');
      expect(res.body.isUsed).to.eq(false);
      expect(stubEmailService.calledOnce).to.be.true;
      expect(stubEmailService.getCall(0).args[0].templateData).to.have.property('passwordResetLink');
      expect(res.body.account).to.eq(account.id);

      expect(
        await PasswordResetTokenRepository.findOne({
          account: account.id,
        }),
      ).to.exist;

      await PasswordResetTokenRepository.deleteOne({
        account: account.id,
      });
    });

    it('should throw an error if account with username does not exists', async () => {
      const username = faker.internet.email();
      const passwordResetTokenparams = {
        username,
      };

      const res = await chai
        .request(app)
        .post('/api/password-reset-token')
        .set('content-type', 'application/json')
        .send(passwordResetTokenparams);

      expect(res.body.message).to.eq(
        new AccountNotFoundError(passwordResetTokenparams.username).message,
      );
    });
  });

  describe('PATCH /account/:accountId/reset-password', () => {
    it('should reset the account password to the new password', async () => {
      sinonSandbox.stub(EmailService, 'sendEmail').returns(Promise.resolve());

      const resetToken = faker.random.alphaNumeric();
      sinonSandbox.stub(PasswordResetTokenUtil, 'generatePasswordResetToken').returns(resetToken);

      await PasswordResetTokenService.createPasswordResetToken({
        username: account.username,
      });

      const newPassword = faker.internet.password();
      const passwordResetTokenParams: ResetPasswordParams = {
        accountId: account.id,
        newPassword,
        token: resetToken,
      };

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${account.id}/reset-password`)
        .set('content-type', 'application/json')
        .send(passwordResetTokenParams);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('username');
      expect(res.body.id).to.eq(account.id);
      expect(res.body.username).to.eq(account.username);

      // Check if account password reset successfully
      const updatedAccount = await AccountRepository.findById(
        account.id,
      );

      expect(
        await AccountUtil.comparePassword(
          newPassword,
          updatedAccount.hashedPassword,
        ),
      ).to.eq(true);

      // Check if password reset token is marked as used.
      const updatedPasswordResetToken = await PasswordResetTokenService
        .getPasswordResetTokenByAccountId(
          account.id,
        );

      expect(updatedPasswordResetToken.isUsed).to.eq(true);

      await PasswordResetTokenRepository.deleteOne({
        _id: updatedPasswordResetToken.id,
      });
    });

    it('should throw 404 if account does not exist', async () => {
      const accountId = faker.database.mongodbObjectId();
      const resetToken = faker.random.alphaNumeric();
      const newPassword = faker.internet.password();
      const passwordResetTokenParams: ResetPasswordParams = {
        accountId,
        newPassword,
        token: resetToken,
      };

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${accountId}/reset-password`)
        .set('content-type', 'application/json')
        .send(passwordResetTokenParams);

      expect(res).to.have.status(404);
      expect(res.body.message).to.eq(new AccountNotFoundError(accountId).message);
    });

    it('should throw 404 if the account\'s password reset token is not found', async () => {
      sinonSandbox.stub(EmailService, 'sendEmail').returns(Promise.resolve());

      const resetToken = faker.random.alphaNumeric();
      sinonSandbox.stub(PasswordResetTokenUtil, 'generatePasswordResetToken').returns(resetToken);

      expect(
        await PasswordResetTokenRepository.findOne({
          account: account.id,
        }),
      ).to.not.exist;

      await PasswordResetTokenService.createPasswordResetToken({
        username: account.username,
      });

      expect(
        await PasswordResetTokenRepository.findOne({
          account: account.id,
        }),
      ).to.exist;

      const newPassword = faker.internet.password();
      const passwordResetTokenParams: ResetPasswordParams = {
        accountId: account.id,
        newPassword,
        token: resetToken,
      };

      await PasswordResetTokenRepository.deleteOne({
        account: account.id,
      });

      expect(
        await PasswordResetTokenRepository.findOne({
          account: account.id,
        }),
      ).to.not.exist;

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${account.id}/reset-password`)
        .set('content-type', 'application/json')
        .send(passwordResetTokenParams);

      expect(res).to.have.status(404);
      expect(res.body.message).to.eq(
        new PasswordResetTokenNotFoundError(account.id).message,
      );
    });

    it('should throw error if the password reset token is already used', async () => {
      sinonSandbox.stub(EmailService, 'sendEmail').returns(Promise.resolve());

      const resetToken = faker.random.alphaNumeric();
      sinonSandbox.stub(PasswordResetTokenUtil, 'generatePasswordResetToken').returns(resetToken);

      const passwordResetToken = await PasswordResetTokenService.createPasswordResetToken({
        username: account.username,
      });

      // Setting Token as used
      await PasswordResetTokenService.setPasswordResetTokenAsUsedById(passwordResetToken.id);

      const newPassword = faker.internet.password();
      const passwordResetTokenParams: ResetPasswordParams = {
        accountId: account.id,
        newPassword,
        token: resetToken,
      };

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${account.id}/reset-password`)
        .set('content-type', 'application/json')
        .send(passwordResetTokenParams);

      expect(res).to.have.status(400);
      expect(res.body.message).to.eq(
        new AccountBadRequestError(
          `Password reset is already used for accountId ${account.id}. Please retry with new link`,
        ).message,
      );

      await PasswordResetTokenRepository.deleteOne({
        account: account.id,
      });
    });

    it('should throw error if the password reset token does not match with the token passed in the payload', async () => {
      sinonSandbox.stub(EmailService, 'sendEmail').returns(Promise.resolve());
      const resetToken = faker.random.alphaNumeric();
      await PasswordResetTokenService.createPasswordResetToken({
        username: account.username,
      });

      const newPassword = faker.internet.password();
      const passwordResetTokenParams: ResetPasswordParams = {
        accountId: account.id,
        newPassword,
        token: resetToken,
      };

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${account.id}/reset-password`)
        .set('content-type', 'application/json')
        .send(passwordResetTokenParams);

      expect(res).to.have.status(400);
      expect(res.body.message).to.eq(
        new AccountBadRequestError(
          `Password reset link is invalid for accountId ${account.id}. Please retry with new link.`,
        ).message,
      );

      await PasswordResetTokenRepository.deleteOne({
        account: account.id,
      });
    });

    it('should throw error if the password reset token is expired', async () => {
      sinonSandbox.stub(EmailService, 'sendEmail').returns(Promise.resolve());

      const resetToken = faker.random.alphaNumeric();
      sinonSandbox.stub(PasswordResetTokenUtil, 'generatePasswordResetToken').returns(resetToken);

      const passwordResetToken = await PasswordResetTokenService.createPasswordResetToken({
        username: account.username,
      });

      await PasswordResetTokenRepository.findByIdAndUpdate(passwordResetToken.id, {
        expiresAt: new Date('2024-03-12'),
      });

      const newPassword = faker.internet.password();
      const passwordResetTokenParams: ResetPasswordParams = {
        accountId: account.id,
        newPassword,
        token: resetToken,
      };

      const res = await chai
        .request(app)
        .patch(`/api/accounts/${account.id}/reset-password`)
        .set('content-type', 'application/json')
        .send(passwordResetTokenParams);

      expect(res).to.have.status(400);
      expect(res.body.message).to.eq(
        new AccountBadRequestError(
          `Password reset link is expired for accountId ${account.id}. Please retry with new link`,
        ).message,
      );

      await PasswordResetTokenRepository.deleteOne({
        account: account.id,
      });
    });
  });
});
