import { assert } from 'chai';

import { ConfigService } from '../../../src/apps/backend/modules/config';

describe('ConfigService', () => {
  describe('getValue', () => {
    it('should return correct env variable value', () => {
      const boolValue = ConfigService.getValue('test.boolTestKey');
      assert.equal(boolValue, true);

      const numberValue = ConfigService.getValue('test.numberTestKey');
      assert.equal(numberValue, 1);

      const stringValue = ConfigService.getValue('test.stringTestKey');
      assert.equal(stringValue, 'string');
    });

    it('should throw MissingKeyError if key is not found in config', () => {
      const missingKey = 'missingKey';

      assert.throws(
        () => ConfigService.getValue(missingKey),
        `Configuration property "${missingKey}" is not defined`,
      );

      assert.throws(
        () => ConfigService.getValue(missingKey),
        `Configuration property "${missingKey}" is not defined`,
      );

      assert.throws(
        () => ConfigService.getValue(missingKey),
        `Configuration property "${missingKey}" is not defined`,
      );
    });
  });

  describe('hasValue', () => {
    it('should return true if configuration value is defined', () => {
      assert.equal(ConfigService.hasValue('test.numberTestKey'), true);
    });

    it('should return false if configuration value is not defined', () => {
      assert.equal(ConfigService.hasValue('test.someRandomConfig'), false);
    });
  });
});
