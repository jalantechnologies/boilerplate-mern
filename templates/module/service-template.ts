import $entityNameReader from './internals/$moduleName-reader';
import { $entityName } from './types';

export default class $entityNameService {
  public static async get$entityName(): Promise<$entityName[]> {
    return $entityNameReader.get$entityName();
  }
}
