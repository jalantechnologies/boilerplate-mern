import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { AccessToken } from '../../../src/apps/backend/modules/access-token';
import { CommentService } from '../../../src/apps/backend/modules/comment';
import { Task, TaskService } from '../../../src/apps/backend/modules/task';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

chai.use(chaiHttp);

describe('Comment API', () => {
  let accessToken: AccessToken;

  beforeEach(async () => {
    ({ accessToken } = await createAccount());
  });

  describe('POST /comments', () => {
    describe('Given valid parameters for creating a comment', () => {
      const params = {
        content: 'This is a test content.',
        taskId: '67c6c24fb319e066d479095c',
      };

      describe('When the createComment endpoint is called', () => {
        let res: ChaiHttp.Response;

        beforeEach(async () => {
          res = await chai
            .request(app)
            .post('/api/comments')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${accessToken.token}`)
            .send(params);
        });

        it('Then it should return the created comment', () => {
          expect(res.status).to.eq(201);
          expect(res.body).to.have.property('content');
          expect(res.body.content).to.eq('This is a test content.');
        });
      });
    });
  });
  describe('GET /comments/:taskId', () => {
    describe('Given a valid taskId', () => {
      let task: Task;
      let res: ChaiHttp.Response;

      beforeEach(async () => {
        task = await TaskService.createTask({
          accountId: '60d0fe4f5311236168a109ca',
          description: 'This is a test task.',
          title: 'Test Task',
        });
        await CommentService.createComment({
          accountId: '60d0fe4f5311236168a109ca',
          content: 'This is a test content.',
          taskId: task.id,
        });
        res = await chai
          .request(app)
          .get(`/api/comments/${task.id}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${accessToken.token}`)
          .send();
      });

      it('Then it should return the comments for the task', () => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
      });
    });
  });

  describe('DELETE /comments/:commentId', () => {
    describe('Given a valid commentId', () => {
      let task: Task;
      let commentId: string;
      let res: ChaiHttp.Response;

      beforeEach(async () => {
        task = await TaskService.createTask({
          accountId: '60d0fe4f5311236168a109ca',
          description: 'This is a test task.',
          title: 'Test Task',
        });

        const comment = await CommentService.createComment({
          accountId: '60d0fe4f5311236168a109ca',
          content: 'This is a test content.',
          taskId: task.id,
        });
        commentId = comment.id;

        res = await chai
          .request(app)
          .delete(`/api/comments/${commentId}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${accessToken.token}`)
          .send();
      });

      it('Then it should delete the comment and return a 201 status', async () => {
        expect(res.status).to.eq(201);

        const getRes = await chai
          .request(app)
          .get(`/api/comments/${task.id}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${accessToken.token}`)
          .send();

        expect(getRes.status).to.eq(404);
        expect(getRes.body).to.not.deep.include({ id: commentId });
      });
    });
  });

  describe('PATCH /comments/:commentId', () => {
    describe('Given a valid commentId and updated content', () => {
      let task: Task;
      let commentId: string;
      let res: ChaiHttp.Response;

      beforeEach(async () => {
        task = await TaskService.createTask({
          accountId: '60d0fe4f5311236168a109ca',
          description: 'This is a test task.',
          title: 'Test Task',
        });

        const comment = await CommentService.createComment({
          accountId: '60d0fe4f5311236168a109ca',
          content: 'This is a test content.',
          taskId: task.id,
        });
        commentId = comment.id;

        res = await chai
          .request(app)
          .patch(`/api/comments/${commentId}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${accessToken.token}`)
          .send({
            content: 'This is updated content.',
          });
      });

      it('Then it should update the comment and return the updated comment', async () => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('content');
        expect(res.body.content).to.eq('This is updated content.');

        const getRes = await chai
          .request(app)
          .get(`/api/comments/${task.id}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${accessToken.token}`)
          .send();

        expect(getRes.status).to.eq(200);
        type Comment = {
          accountId: string;
          content: string;
          id: string;
          taskId: string;
        };
        const updatedComment = (getRes.body as Comment[]).find(
          (comment) => comment.id === commentId
        );
        expect(updatedComment).to.have.property(
          'content',
          'This is updated content.'
        );
      });
    });
  });
});
