import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { AccessToken } from '../../../src/apps/backend/modules/access-token';
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
});
