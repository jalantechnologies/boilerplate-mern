import { assert } from 'chai';
import ConfigService from '../../../src/apps/backend/modules/config/config-service';

describe('ConfigService', () => {
  describe('getValue', () => {
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

  describe('hasValue', () => {
    it('should return true if configuration value is defined', () => {
      assert.equal(ConfigService.hasValue('numberTestKey'), true);
    });

    it('should return false if configuration value is not defined', () => {
      assert.equal(ConfigService.hasValue('someRandomConfig'), false);
    });
  });
});
