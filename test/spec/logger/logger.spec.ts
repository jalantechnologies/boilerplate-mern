import Logger from 'modules/logger/logger';
import sinon from 'sinon';

describe('Logger', () => {
  it('should be able to register console as a logger', () => {
    const consoleInfo = sinon.spy(console, 'info');

    Logger.info('test');

    sinon.assert.calledOnce(consoleInfo);
  });
});
