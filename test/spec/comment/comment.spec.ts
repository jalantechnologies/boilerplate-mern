import chai, { expect } from 'chai';

import { AccessToken } from '../../../src/apps/backend/modules/access-token';
import { Account } from '../../../src/apps/backend/modules/account';
import { ObjectIdUtils } from '../../../src/apps/backend/modules/database';
import TaskService from '../../../src/apps/backend/modules/task/task-service';
import CommentRepository from '../../../src/apps/backend/modules/comment/internal/store/comment-repository';
import CommentService from '../../../src/apps/backend/modules/comment/comment-service';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

describe('Comment API', () => {
  let account: Account;
  let accessToken: AccessToken;

  beforeEach(async () => {
    ({ account, accessToken } = await createAccount());
  });

  describe('POST /comments', () => {
    it('should be able to add a comment to a task', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      const res = await chai
        .request(app)
        .post(`/api/comments`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          accountId: account.id,
          taskId: task.id,
          comment: 'This is a test comment.',
        });

        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('account');
        expect(res.body).to.have.property('task');
        expect(res.body).to.have.property('comment');
        expect(res.body.account).to.eq(account.id);
        expect(res.body.task).to.eq(task.id);
        expect(res.body.comment).to.eq('This is a test comment.');
    });
  });

  describe('GET /comments/:taskId', () => {
    it('should be able to return all comments for a specific task', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      await CommentService.createComment({
        taskId: task.id, 
        accountId: account.id, 
        comment: 'This is the first test comment.'
      });
      
      await CommentService.createComment({
        taskId: task.id, 
        accountId: account.id, 
        comment: 'This is the second test comment.'
      });

      const res = await chai
        .request(app)
        .get(`/api/comments/${task.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(2);
      expect(res.body[0].comment).to.eq('This is the first test comment.');
      expect(res.body[1].comment).to.eq('This is the second test comment.');
    });

    it('should return error if requested task does not exists', async () => {
      const res = await chai
        .request(app)
        .get(`/api/comments/${ObjectIdUtils.createNew()}`)
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
        .delete(`/api/comments/${task.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(404);
    });
  });

  describe('PATCH /comments/:commentId', () => {
    it('should be able to update an existing comment', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      const comment = await CommentService.createComment({
        taskId: task.id, 
        accountId: account.id, 
        comment: 'This is a test comment.'
      });
  
      const res = await chai
        .request(app)
        .patch(`/api/comments/${comment.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send({
          comment: 'This test comment is updated.',
        });
  
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('comment');
      expect(res.body.id).to.eq(comment.id);
      expect(res.body.comment).to.eq('This test comment is updated.');
    });
  });

  describe('DELETE comments/:commentId', () => {
    it('should be able to delete a comment from a task', async () => {
      const task = await TaskService.createTask({
        accountId: account.id,
        title: 'my-task',
        description: 'This is a test description.',
      });

      const comment = await CommentService.createComment({
        taskId: task.id, 
        accountId: account.id, 
        comment: 'This is a test comment.'
    });

      const res = await chai
        .request(app)
        .delete(`/api/comments/${comment.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken.token}`)
        .send();

      expect(res.status).to.eq(204);

      const updatedToken = await CommentRepository.findById(comment.id);
      expect(updatedToken.active).to.be.false;
    });
  });
});
