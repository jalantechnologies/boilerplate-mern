import chai, { expect } from 'chai';

import { AccessToken } from '../../../src/apps/backend/modules/access-token';
import { Account } from '../../../src/apps/backend/modules/account';
import { Types } from 'mongoose';
import SharedTaskService from '../../../src/apps/backend/modules/shared-task/internal/shared-task-service';
import TaskService from '../../../src/apps/backend/modules/task/task-service';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

describe('Shared Task API', () => {
  let account: Account;
  let accessToken: AccessToken;

  beforeEach(async () => {
    ({ account, accessToken } = await createAccount());
  });

  describe('POST /tasks/:taskId/share', () => {
    it('should share a task with another account', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      const sharedTask = await SharedTaskService.shareTask(
        new Types.ObjectId(task.id),
        new Types.ObjectId(account.id),
      );

      const res = await chai
        .request(app)
        .post(`/api/tasks/${task.id}/share`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({ accountId: account.id });

      expect(res.status).to.eq(201);
      expect(sharedTask.task.toString()).to.eq(task.id);
      expect(sharedTask.account.toString()).to.eq(account.id);
    });
  });

  describe('GET /shared-tasks', () => {
    it('should return list of tasks shared with the account', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      await SharedTaskService.shareTask(
        new Types.ObjectId(task.id),
        new Types.ObjectId(account.id),
      );

      const res = await chai
        .request(app)
        .get('/api/shared-tasks')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(1);
      expect(res.body[0].task).to.eq(task.id);
      expect(res.body[0].account).to.eq(account.id);
    });
  });
});
