import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import { app } from '../helpers/helper.spec';
import TaskService from '../../../src/apps/backend/modules/task/task-service';
import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import AccessTokenWriter from '../../../src/apps/backend/modules/access-token/internal/access-token-writer';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import TaskRepository from '../../../src/apps/backend/modules/task/internal/store/task-repository';

describe('API /api/accounts/:accountId/tasks', () => {
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  describe('GET', () => {
    it('should return a list of all tasks for a particular accountId', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password' };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );

      const accountId = account.id;

      const previousTasks = await TaskService.getTasksForAccount({
        accountId,
      });
      expect(previousTasks.length).to.eq(0);

      for (let i = 0; i < 2; i++) {
        await TaskService.createTask({
          accountId,
          name: `${i}`,
        });
      }

      const beforeTestCreatedTasks = await TaskService.getTasksForAccount({
        accountId,
      });
      expect(beforeTestCreatedTasks.length).to.eq(2);
      expect(accountId).to.not.be.undefined;
      expect(accessToken).to.not.be.undefined;

      const res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(2);

      const afterTestCreatedtasks = await TaskService.getTasksForAccount({
        accountId,
      });
      expect(afterTestCreatedtasks.length).to.eq(2);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });

    it('should return a particular task', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password' };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );
      const accountId = account.id;

      let res: any;
      let task: any;
      const params = {
        name: 'another simple task.',
      };

      try {
        task = await TaskService.getTaskByNameForAccount({
          accountId,
          name: params.name,
        });
      } catch (e) {
        task = await TaskService.createTask({
          accountId,
          name: params.name,
        });
      }

      const taskId = task.id;
      const taskName = task.name;

      const isTaskCreated = await TaskService.getTaskForAccount({
        accountId,
        taskId,
      });
      expect(isTaskCreated).not.to.be.undefined;
      expect(isTaskCreated).to.have.property('id');
      expect(isTaskCreated.id).to.eq(taskId);
      expect(isTaskCreated.name).to.eq(taskName);

      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.eq(taskName);
      expect(res.body.id).to.eq(taskId);

      const particularTask = await TaskService.getTaskForAccount({
        accountId,
        taskId: res.body.id,
      });
      expect(particularTask).not.to.be.undefined;
      expect(particularTask).to.have.property('id');
      expect(particularTask.id).to.eq(taskId);
      expect(particularTask.name).to.eq(taskName);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });

    it('should return 404 Not Found Error if task is deleted', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password' };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );
      const accountId = account.id;
      let res: any;
      let task: any;
      const params = {
        name: 'very simple task.',
      };

      try {
        task = await TaskService.getTaskByNameForAccount({
          accountId,
          name: params.name,
        });
      } catch (e) {
        task = await TaskService.createTask({
          accountId,
          name: params.name,
        });
      }
      const taskId = task.id;

      const isTaskCreated = await TaskService.getTaskForAccount({
        accountId,
        taskId,
      });
      expect(isTaskCreated).not.to.be.undefined;
      expect(isTaskCreated).to.have.property('id');
      expect(isTaskCreated.id).to.eq(taskId);
      expect(isTaskCreated.name).to.eq(params.name);

      // trying to get task before deletion.
      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.eq(params.name);
      expect(res.body.id).to.eq(taskId);

      // deleting the task with the given task Id
      res = await chai
        .request(app)
        .delete(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();
      expect(res).to.have.status(204);

      // trying to get task after soft deletion.
      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Beare ${accessToken}`)
        .send();
      expect(res.status).to.eq(404);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });
  });

  describe('POST', () => {
    it('should create a new task', async () => {
      const params = {
        name: 'simple task.',
      };

      const accountParams = { username: faker.internet.userName(), password: 'password' };
      const account = await AccountWriter.createAccount(accountParams);
      const { token } = await AccessTokenWriter.createAccessToken(accountParams);

      await expect(
        TaskService.getTaskByNameForAccount({
          accountId: account.id,
          name: params.name,
        }),
      ).to.be.rejectedWith(`Task with name ${params.name} not found.`);

      const res = await chai
        .request(app)
        .post(`/api/accounts/${account.id}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(params);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('account');
      expect(res.body).to.have.property('name');
      expect(res.body.account).to.eq(account.id);
      expect(res.body.name).to.eq(params.name);

      const createdTask = await TaskService.getTaskForAccount({
        accountId: account.id,
        taskId: res.body.id,
      });
      expect(createdTask).to.have.property('id');
      expect(createdTask.id).to.eq(res.body.id);
      expect(createdTask.name).to.eq(params.name);

      await AccountRepository.accountDB.deleteOne({ _id: account.id });
      await TaskRepository.taskDB.deleteOne({ _id: res.body.id });
    });
  });

  describe('DELETE', () => {
    it('should change "active" flag of task to be false', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password' };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );
      const accountId = account.id;
      let res: any;
      let task: any;

      const params = {
        name: 'simple task.',
      };

      try {
        task = await TaskService.getTaskByNameForAccount({
          accountId,
          name: params.name,
        });
      } catch (e) {
        task = await TaskService.createTask({
          accountId,
          name: params.name,
        });
      }

      const taskId = task.id;
      const isTaskCreated = await TaskService.getTaskForAccount({
        accountId,
        taskId,
      });

      expect(isTaskCreated).not.to.be.undefined;
      expect(isTaskCreated).to.have.property('id');
      expect(isTaskCreated).to.have.property('name');
      expect(isTaskCreated.id).to.eq(taskId);
      expect(isTaskCreated.name).to.eq(params.name);

      // deleting the task with the given task Id
      res = await chai
        .request(app)
        .delete(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();
      expect(res).to.have.status(204);

      // trying to get task after soft deletion.
      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Beare ${accessToken}`)
        .send();
      expect(res.body.httpStatusCode).to.eq(404);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });
  });
});
