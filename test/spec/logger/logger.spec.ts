/* eslint-disable @typescript-eslint/no-unsafe-call */
import sinon from 'sinon';
import { expect } from 'chai';
import LoggerManager from '../../../src/modules/logger/logger-manager';
import Logger from '../../../src/modules/logger/logger';
import ConfigService from '../../../src/modules/config/config-service';
import RollbarLogger from '../../../src/modules/logger/internals/rollbar-logger';
import ConsoleLogger from '../../../src/modules/logger/internals/console-logger';
import { Environment } from '../../../src/modules/config/types';
import Loggers from '../../../src/modules/logger/internals/loggers';

let sinonSandbox: sinon.SinonSandbox;

describe('Loggers', () => {
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

  it('should call console logger in local env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.LOCAL);
    sinonSandbox.stub(Loggers, 'getConsoleLogger').returns(consoleLogger);
    const stub = sinonSandbox.stub(consoleLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call console logger in testing env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.TESTING);
    sinonSandbox.stub(Loggers, 'getConsoleLogger').returns(consoleLogger);
    const stub = sinonSandbox.stub(consoleLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in local env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.STAGING);
    sinonSandbox.stub(Loggers, 'getRollbarLogger').returns(rollbarLogger);
    const stub = sinonSandbox.stub(rollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in qa env', () => {
    sinonSandbox.stub(ConfigService, 'getEnvironment').returns(Environment.QA);
    sinonSandbox.stub(Loggers, 'getRollbarLogger').returns(rollbarLogger);
    const stub = sinonSandbox.stub(rollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in beta env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.BETA);
    sinonSandbox.stub(Loggers, 'getRollbarLogger').returns(rollbarLogger);
    const stub = sinonSandbox.stub(rollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in production env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.PRODUCTION);
    sinonSandbox.stub(Loggers, 'getRollbarLogger').returns(rollbarLogger);
    const stub = sinonSandbox.stub(rollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });
});
