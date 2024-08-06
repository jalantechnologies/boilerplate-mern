import chai, { expect } from 'chai';
import { AccessToken } from '../../../src/apps/backend/modules/access-token';
import { Account } from '../../../src/apps/backend/modules/account';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';
import { TaskService } from '../../../src/apps/backend/modules/task';
import ShareTaskRequestService from '../../../src/apps/backend/modules/share-task-request/share-task-request-service';

describe('Shared Task API', () => {
  let account: Account;
  let accessToken: AccessToken;
  let taskId: string;

  beforeEach(async () => {
    ({ account, accessToken } = await createAccount());

    const task = await TaskService.createTask({
      accountId: account.id,
      title: 'my-task',
      description: 'This is a test description.',
    });

    taskId = task.id;
  });

  describe('POST /tasks/:taskId/share-task-requests', () => {
    it('should share a task with one or more users', async () => {
      const { account: anotherAccount } = await createAccount();

      const res = await chai
        .request(app)
        .post(`/api/tasks/${taskId}/share-task-requests`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          accountIds: [anotherAccount.id],
        });

      expect(res.status).to.eq(201);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(1);
      expect(res.body[0].task).to.eq(taskId);
      expect(res.body[0].account).to.eq(anotherAccount.id);
      expect(res.body[0].status).to.eq('approved');
    });

    it('should return error if trying to share task without taskId or accountIds', async () => {
      const res = await chai
        .request(app)
        .post(`/api/tasks/${taskId}/share-task-requests`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          accountIds: [],
        });

      expect(res.status).to.eq(400);
    });
  });

  describe('GET /tasks/shared/:accountId', () => {
    it('should return shared tasks for the account', async () => {
      const { account: anotherAccount } = await createAccount();

      await ShareTaskRequestService.createSharedTaskRequest({
        taskId,
        accountId: anotherAccount.id,
      });

      const res = await chai
        .request(app)
        .get(`/api/tasks/shared/${anotherAccount.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });

    it('should return empty array if no tasks shared with the account', async () => {
      const res = await chai
        .request(app)
        .get(`/api/tasks/shared/${account.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(0);
    });
  });
});
