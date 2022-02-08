/* eslint-disable @typescript-eslint/no-unsafe-call */
import sinon from 'sinon';
import { expect } from 'chai';
import LoggerManager from '../../../src/modules/logger/logger-manager';
import Logger from '../../../src/modules/logger/logger';
import ConfigService from '../../../src/modules/config/config-service';
import RollbarLogger from '../../../src/modules/logger/internals/rollbar-logger';
import ConsoleLogger from '../../../src/modules/logger/internals/console-logger';
import { Environment } from '../../../src/modules/config/types';

let sinonSandbox: sinon.SinonSandbox;

describe('Loggers', () => {
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should initialize', () => {
    const stub = sinonSandbox.stub(ConsoleLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call console logger in local env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.LOCAL);
    const stub = sinonSandbox.stub(ConsoleLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call console logger in testing env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.TESTING);
    const stub = sinonSandbox.stub(ConsoleLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in local env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.STAGING);
    const stub = sinonSandbox.stub(RollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in qa env', () => {
    sinonSandbox.stub(ConfigService, 'getEnvironment').returns(Environment.QA);
    const stub = sinonSandbox.stub(RollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in beta env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.BETA);
    const stub = sinonSandbox.stub(RollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });

  it('should call external logger in production env', () => {
    sinonSandbox
      .stub(ConfigService, 'getEnvironment')
      .returns(Environment.PRODUCTION);
    const stub = sinonSandbox.stub(RollbarLogger, 'info');
    LoggerManager.mountLogger();
    Logger.info('test');
    expect(stub.calledOnce).to.be.true;
  });
});
