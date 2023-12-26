import sinon from 'sinon';
import { expect } from 'chai';

import LoggerManager from '../../../src/apps/backend/modules/logger/logger-manager';
import Logger from '../../../src/apps/backend/modules/logger/logger';
import ConfigService from '../../../src/apps/backend/modules/config/config-service';
import DatadogLogger from '../../../src/apps/backend/modules/logger/internals/datadog-logger';
import ConsoleLogger from '../../../src/apps/backend/modules/logger/internals/console-logger';
import Loggers from '../../../src/apps/backend/modules/logger/internals/loggers';
import { LoggerTransport } from '../../../src/apps/backend/modules/logger/internals/types';

describe('Logger', () => {
  let sinonSandbox: sinon.SinonSandbox;
  const consoleLogger = new ConsoleLogger();
  const datadogLogger = new DatadogLogger();

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

  it('should be able to register datadog as a logger', () => {
    sinonSandbox
      .stub(ConfigService, 'getListValue')
      .returns([LoggerTransport.Datadog]);
    sinonSandbox.stub(Loggers, 'getDatadogLogger').returns(datadogLogger);

    const stub = sinonSandbox.stub(datadogLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');

    expect(stub.calledOnce).to.be.true;
  });
});
