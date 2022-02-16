/* eslint-disable @typescript-eslint/no-unsafe-call */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';
import sinon from 'sinon';
import ConfigService from '../../../src/modules/config/config-service';
import TaskService from '../../../src/modules/task/task-service';
import App from '../../../src/app';
import chaiAsPromised from 'chai-as-promised';
import { v4 as uuid } from 'uuid';
import { Server } from 'http';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

let sinonSandbox: sinon.SinonSandbox;
let app: Application;
let server: Server;
let accountCreds;
let accountId: string;
let accessToken: string;

describe.skip('Task Service.', () => {
  before(async () => {
    server = await App.startRESTApiServer();
    app = App['app'];
    accountCreds = {
      username: uuid(),
      password: 'password',
    }
  });

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
    sinonSandbox.stub(ConfigService, 'getStringValue').returns('1h');

    await chai
      .request(app)
      .post('/api/accounts')
      .set('content-type', 'application/json')
      .send(accountCreds);

    const createdAccessToken = await chai
      .request(app)
      .post('/api/access-tokens')
      .set('content-type', 'application/json')
      .send(accountCreds);
    accessToken = createdAccessToken.body.token;
    accountId = createdAccessToken.body.accountId;
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  after(async () => {
    server.close();
  });

  it('GET "/api/accounts/:accountId/tasks" should return a list of all tasks for a particular accountId.', async () => {

    const previousTasks = await TaskService.getTasks({
      accountId,
    });
    expect(previousTasks.length).to.eq(0);

    for(let i = 0; i < 2;i++) {
      await chai
        .request(app)
        .post(`/api/accounts/${accountId}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: `${i}`
        });
    }

    const res = await chai
      .request(app)
      .get(`/api/accounts/${accountId}/tasks`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.eq(2);

    const afterCreationtasks = await TaskService.getTasks({
      accountId,
    });
    expect(afterCreationtasks.length).to.eq(2);
  });

  it('POST "/api/accounts/:accountId/tasks" should create a new task.', async () => {

    const params = {
      name: 'simple task.'
    };

    await expect(TaskService.getTaskByName({
      accountId,
      name: params.name
    })).to.be.rejectedWith(`Task with name ${params.name} not found.`);
    
    const res = await chai
      .request(app)
      .post(`/api/accounts/${accountId}/tasks`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(params);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('account');
    expect(res.body).to.have.property('name');
    expect(res.body.account).to.eq(accountId);
    expect(res.body.name).to.eq('simple task.');

    const createdTask = await TaskService.getTask({
      accountId,
      taskId: res.body.id
    });
    expect(createdTask).to.have.property('id');
    expect(createdTask.id).to.eq(res.body.id);
    expect(createdTask.name).to.eq(params.name);
  });

  it('GET "/api/accounts/:accountId/tasks/:taskId" should return a particular task.', async () => {

    let res: any;
    let task: any;
    const params = {
      name: 'another simple task.'
    };

    try {
      task = await TaskService.getTaskByName({
        accountId,
        name: params.name,
      });
    } catch (e) {
      const res = await chai
        .request(app)
        .post(`/api/accounts/${accountId}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(params);
      expect(res).to.have.status(201);
      task = res.body;
    }

    const taskId = task.id;
    const taskName = task.name;

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

    const particularTask = await TaskService.getTask({
      accountId,
      taskId: res.body.id
    });
    expect(particularTask).not.to.be.undefined;
    expect(particularTask).to.have.property('id');
  });

  it('GET "/api/accounts/:accountId/tasks/:taskId" should return 404 Not Found Error if task is deleted.', async () => {
    
    let res: any;
    let task: any;
    const params = {
      name: 'very simple task.'
    };

    try {
      task = await TaskService.getTaskByName({
        accountId,
        name: params.name,
      });
    } catch (e) {
      const res = await chai
        .request(app)
        .post(`/api/accounts/${accountId}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(params);
      expect(res).to.have.status(201);
      task = res.body;
    }
    const taskId = task.id;

    // trying to get task before deletion.
    res = await chai
      .request(app)
      .get(`/api/accounts/${accountId}/tasks/${taskId}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Beare ${accessToken}`)
      .send();
    expect(res).not.to.have.status(200);
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
    expect(res).to.have.status(404);
  });

  it('DELETE "/api/accounts/:accountId/tasks/:taskId" should change "active" flag of task to be false.', async () => {

    let res: any;
    let task: any;

    const params = {
      name: 'simple task.'
    };

    try {
      task = await TaskService.getTaskByName({
        accountId,
        name: params.name,
      });
    } catch (e) {
      const res = await chai
        .request(app)
        .post(`/api/accounts/${accountId}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(params);
      expect(res).to.have.status(201);
      task = res.body;
    }

    const taskId = task.id;

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
    expect(res).not.to.have.status(404);
  });
});
