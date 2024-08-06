import chai, { expect } from 'chai';
import { AccessToken } from '../../../src/apps/backend/modules/access-token';
import { Account } from '../../../src/apps/backend/modules/account';
import { TaskService } from '../../../src/apps/backend/modules/task'; 
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

describe('Comment API', () => {
  let account: Account;
  let accessToken: AccessToken;
  let taskId: string;
  let commentId: string;

  beforeEach(async () => {
    ({ account, accessToken } = await createAccount());

    const task = await TaskService.createTask({
      accountId: account.id,
      title: 'my-task',
      description: 'This is a test description.',
    });

    taskId = task.id;
  });

  describe('POST /tasks/:taskId/comments', () => {
    it('should add a comment to a task', async () => {
      const res = await chai
        .request(app)
        .post(`/api/tasks/${taskId}/comments`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          comment: 'This is a test comment.',
        });

      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('comment');
      expect(res.body.comment).to.equal('This is a test comment.');
      commentId = res.body.id;
    });
  });

  describe('GET /tasks/:taskId/comments', () => {
    it('should fetch comments for a task', async () => {
      const res = await chai
        .request(app)
        .get(`/api/tasks/${taskId}/comments`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('PUT /tasks/:taskId/comments/:commentId', () => {
    it('should update a comment', async () => {
      const res = await chai
        .request(app)
        .put(`/api/tasks/${taskId}/comments/${commentId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          comment: 'This is an updated test comment.',
        });

      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('comment');
      expect(res.body.comment).to.equal('This is an updated test comment.');
    });
  });

  describe('DELETE /tasks/:taskId/comments/:commentId', () => {
    it('should delete a comment', async () => {
      const res = await chai
        .request(app)
        .delete(`/api/tasks/${taskId}/comments/${commentId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Comment deleted successfully');
    });
  });
});
