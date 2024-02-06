import sinon from 'sinon';

import Logger from '../../../src/apps/backend/modules/logger/logger';

describe('Logger', () => {
  it('should be able to register console as a logger', () => {
    const consoleInfo = sinon.spy(console, 'info');

    Logger.info('test');

    sinon.assert.calledOnce(consoleInfo);
  });
});
