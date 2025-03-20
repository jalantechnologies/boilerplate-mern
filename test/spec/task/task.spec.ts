import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import { Account } from 'modules/account';
import { AccessToken } from 'modules/authentication';
import TaskRepository from 'modules/task/internal/store/task-repository';
import TaskService from 'modules/task/task-service';

import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

describe('Task API', () => {
  let account: Account;
  let accessToken: AccessToken;

  beforeEach(async () => {
    ({ account, accessToken } = await createAccount());
  });

  describe('GET /tasks', () => {
    it('should be able to return list of tasks created by the account', async () => {
      await TaskService.createTask({
        accountId: account.id,
        title: 'my-task-1',
        description: 'This is a test description.',
      });
      await TaskService.createTask({
        accountId: account.id,
        title: 'my-task-2',
        description: 'This is a test description.',
      });

      const res = await chai
        .request(app)
        .get('/api/tasks')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(2);
    });

    it('should skip out tasks which have been marked as deleted', async () => {
      const t1 = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task-1',
        description: 'This is a test description.',
      });
      const t2 = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task-2',
        description: 'This is a test description.',
      });

      await TaskService.deleteTask({
        accountId: account.id,
        taskId: t2.id,
      });

      const res = await chai
        .request(app)
        .get('/api/tasks')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(1);
      expect(res.body[0].id).to.eq(t1.id);
    });

    it('should skip out tasks which do not belong to the logged in account', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task-1',
        description: 'This is a test description.',
      });

      const { account: anotherAccount } = await createAccount();
      await TaskService.createTask({
        accountId: anotherAccount.id,
        title: 'my-task-2',
        description: 'This is a test description.',
      });

      const res = await chai
        .request(app)
        .get('/api/tasks')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(1);
      expect(res.body[0].id).to.eq(task.id);
    });
  });

  describe('POST /tasks', () => {
    it('should be able to create a new task', async () => {
      const res = await chai
        .request(app)
        .post('/api/tasks')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          title: 'my-task',
          description: 'This is a test description.',
        });

      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('account');
      expect(res.body).to.have.property('title');
      expect(res.body).to.have.property('description');
      expect(res.body.account).to.eq(account.id);
      expect(res.body.title).to.eq('my-task');
      expect(res.body.description).to.eq('This is a test description.');
    });
  });

  describe('GET /tasks/:id', () => {
    it('should be able to return the requested task', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      const res = await chai
        .request(app)
        .get(`/api/tasks/${task.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(task.id);
      expect(res.body.title).to.eq('my-task');
      expect(res.body.description).to.eq('This is a test description.');
    });

    it('should return error if requested task does not exists', async () => {
      const taskId = faker.database.mongodbObjectId();
      const res = await chai
        .request(app)
        .get(`/api/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(404);
    });

    it('should return error if requested task has been marked as deleted', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task-1',
        description: 'This is a test description.',
      });
      await TaskService.deleteTask({
        accountId: account.id,
        taskId: task.id,
      });

      const res = await chai
        .request(app)
        .delete(`/api/tasks/${task.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(404);
    });
  });

  describe('DELETE /tasks/:taskId', () => {
    it('should be able to delete provided task', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      const res = await chai
        .request(app)
        .delete(`/api/tasks/${task.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();
      expect(res.status).to.eq(204);

      const updatedToken = await TaskRepository.findById(task.id);
      expect(updatedToken.active).to.be.false;
    });
  });
});
