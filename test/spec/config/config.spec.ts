/* eslint-disable @typescript-eslint/no-unsafe-call */
import { assert } from 'chai';
import { Environment } from '../../../src/modules/config/types';
import ConfigService from '../../../src/modules/config/config-service';

describe('ConfigService', () => {
  it('should return correct environment', () => {
    const env = ConfigService.getEnvironment();
    assert.equal(env, Environment.TESTING);
  });

  it('should return correct env variable value', () => {
    const boolValue = ConfigService.getBoolValue('boolTestKey');
    assert.equal(boolValue, true);

    const numberValue = ConfigService.getIntValue('numberTestKey');
    assert.equal(numberValue, 1);

    const stringValue = ConfigService.getStringValue('stringTestKey');
    assert.equal(stringValue, 'string');
  });

  it('should throw MissingKeyError if key is not found in config', () => {
    const missingKey = 'missingKey';

    assert.throws(
      () => ConfigService.getBoolValue(missingKey),
      `Configuration property "${missingKey}" is not defined`,
    );

    assert.throws(
      () => ConfigService.getIntValue(missingKey),
      `Configuration property "${missingKey}" is not defined`,
    );

    assert.throws(
      () => ConfigService.getStringValue(missingKey),
      `Configuration property "${missingKey}" is not defined`,
    );
  });

  it('should throw a ValueTypeMismatchError if type of value does not match', () => {
    assert.throws(
      () => ConfigService.getBoolValue('stringTestKey'),
      'Value mismatch for key: stringTestKey. Expected: boolean, Actual: string',
    );

    assert.throws(
      () => ConfigService.getIntValue('stringTestKey'),
      'Value mismatch for key: stringTestKey. Expected: number, Actual: string',
    );

    assert.throws(
      () => ConfigService.getStringValue('boolTestKey'),
      'Value mismatch for key: boolTestKey. Expected: string, Actual: boolean',
    );
  });
});
