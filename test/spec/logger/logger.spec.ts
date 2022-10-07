import sinon from 'sinon';
import { expect } from 'chai';

import LoggerManager from '../../../src/apps/backend/modules/logger/logger-manager';
import Logger from '../../../src/apps/backend/modules/logger/logger';
import ConfigService from '../../../src/apps/backend/modules/config/config-service';
import RollbarLogger from '../../../src/apps/backend/modules/logger/internals/rollbar-logger';
import ConsoleLogger from '../../../src/apps/backend/modules/logger/internals/console-logger';
import Loggers from '../../../src/apps/backend/modules/logger/internals/loggers';
import { LoggerTransport } from '../../../src/apps/backend/modules/logger/internals/types';

describe('Logger', () => {
  let sinonSandbox: sinon.SinonSandbox;
  const consoleLogger = new ConsoleLogger();
  const rollbarLogger = new RollbarLogger();

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should initialize', () => {
    sinonSandbox.stub(Loggers, 'getConsoleLogger').returns(consoleLogger);
    const stub = sinonSandbox.stub(consoleLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should be able to register console as a logger', () => {
    sinonSandbox
      .stub(ConfigService, 'getListValue')
      .returns([LoggerTransport.Console]);
    sinonSandbox.stub(Loggers, 'getConsoleLogger').returns(consoleLogger);

    const stub = sinonSandbox.stub(consoleLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');

    expect(stub.calledOnce).to.be.true;
  });

  it('should be able to register rollbar as a logger', () => {
    sinonSandbox
      .stub(ConfigService, 'getListValue')
      .returns([LoggerTransport.Rollbar]);
    sinonSandbox.stub(Loggers, 'getRollbarLogger').returns(rollbarLogger);

    const stub = sinonSandbox.stub(rollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');

    expect(stub.calledOnce).to.be.true;
  });
});
