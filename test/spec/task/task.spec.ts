/* eslint-disable @typescript-eslint/no-unsafe-call */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import sinon from 'sinon';
import TaskServiceManager from '../../../src/modules/task/task-service-manager';
import bodyParser from 'body-parser';
import AccesstokenServiceManager from '../../../src/modules/access-token/access-token-manager';
import ConfigService from '../../../src/modules/config/config-service';
import TaskService from '../../../src/modules/task/task-service';

chai.use(chaiHttp);

let sinonSandbox: sinon.SinonSandbox;
let appOne: any;
let appTwo: any;
let accessToken: string;
const accountCreds: any = {
  username: 'Sample Username',
  password: 'Sample Password',
};
let accountId: string;

describe.skip('Task Service.', () => {
  before(async () => {
    
    appOne = express();
    appTwo = express();

    appOne.use(bodyParser.urlencoded({ extended: true }));
    appOne.use(bodyParser.json());
    appTwo.use(bodyParser.urlencoded({ extended: true }));
    appTwo.use(bodyParser.json());
    
    appOne.use('/', await AccesstokenServiceManager.createRestAPIServer());
    appTwo.use('/', await TaskServiceManager.createRestAPIServer());

  });

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
    sinonSandbox.stub(ConfigService, 'getStringValue').returns('1h');
    const res = await chai
      .request(appOne)
      .post('/api/access-tokens')
      .set('content-type', 'application/json')
      .send(accountCreds);
    accessToken = res.body.token;
    accountId = res.body.accountId;
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('GET "/api/accounts/:accountId/tasks" should return a list of all tasks for a particular accountId.', async () => {

    // creating some tasks
    for(let i = 0; i < 2;i++) {
      await chai
        .request(appTwo)
        .post(`/api/accounts/${accountId}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: `${i}`
        });
    }

    // getting a list of tasks
    const res = await chai
      .request(appTwo)
      .get(`/api/accounts/${accountId}/tasks`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');

    // As we are not mocking DB and the tests are running on real DB URL. 
    // So there may be more than 2 tasks also in DB.
    // So we are just making sure that we get an array of tasks for that account using this API URL.
    
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('POST "/api/accounts/:accountId/tasks" should create a new task.', async () => {
    const params = {
      name: 'simple task.'
    };

    const res = await chai
      .request(appTwo)
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

    // checking if the task is created in DB
    const createdTask = await TaskService.getTask({
      accountId,
      taskId: res.body.id
    });
    expect(createdTask).to.have.property('id');
    expect(createdTask.id).to.eq(res.body.id);
  });

  it('GET "/api/accounts/:accountId/tasks/:taskId" should return a particular task.', async () => {

    let res: any;
    const taskTitle = 'simple task.'

    // creating a task before
    const params = {
      name: taskTitle
    };

    res = await chai
      .request(appTwo)
      .post(`/api/accounts/${accountId}/tasks`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(params);
    expect(res).to.have.status(200);

    const taskId = res.body.id;

    // getting the task
    res = await chai
      .request(appTwo)
      .get(`/api/accounts/${accountId}/tasks/${taskId}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');
    expect(res.body.name).to.eq(taskTitle);
    expect(res.body.id).to.eq(taskId);

    // checking if a task is created in DB.
    const particularTask = await TaskService.getTask({
      accountId,
      taskId: res.body.id
    });
    expect(particularTask).not.to.be.undefined;
    expect(particularTask).to.have.property('id');
  });

  it('DELETE "/api/accounts/:accountId/tasks/:taskId" should change "active" flag of task to be false.', async () => {

    let res: any;
    const taskTitle = 'simple task.'

    // creating a task
    const params = {
      name: taskTitle
    };

    res = await chai
      .request(appTwo)
      .post(`/api/accounts/${accountId}/tasks`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(params);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');

    const taskId = res.body.id;

    // deleting the task with the given task Id
    res = await chai
      .request(appTwo)
      .delete(`/api/accounts/${accountId}/tasks/${taskId}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
    expect(res).to.have.status(204);

    // trying to get task after soft deletion.
    res = await chai
      .request(appTwo)
      .get(`/api/accounts/${accountId}/tasks/${taskId}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Beare ${accessToken}`)
      .send();
    expect(res).not.to.have.status(200);
    expect(res.body).not.to.have.property('id');
  });
});
