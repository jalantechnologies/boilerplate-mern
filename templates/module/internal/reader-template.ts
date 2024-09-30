import { $entityName } from '../types';

import $entityNameRepository from './store/$moduleName-repository';

export default class $entityNameReader {
  public static async get$entityName(): Promise<$entityName[]> {
    const $moduleNames = await $entityNameRepository.find();

    return $moduleNames.map((data) => ({
      id: data._id.toString(),
    }));
  }
}
