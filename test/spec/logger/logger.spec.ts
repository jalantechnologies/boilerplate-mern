/* eslint-disable @typescript-eslint/no-unsafe-call */
import sinon from 'sinon';
import { expect } from 'chai';
import LoggerManager from '../../../src/modules/logger/logger-manager';
import Logger from '../../../src/modules/logger/logger';

let sinonSandbox: sinon.SinonSandbox;

describe('Loggers', () => {
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should initialize', () => {
    const stub = sinonSandbox.stub(console, 'log');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });
});
