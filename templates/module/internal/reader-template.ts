import $entityNameRepository from './store/$moduleName-repository';
import {
  $entityName,
  Get$entityNameReaderParams,
  PaginatedResponse,
  $entityNameNotFoundError,
} from '../types';
import $entityNameUtil from './$moduleName-util';
export default class $entityNameReader {
  public static async get$entityNames({
    page,
    size,
  }: Get$entityNameReaderParams): Promise<PaginatedResponse<$entityName>> {
    const skip = (page - 1) * size;

    const $moduleNameDBs = await $entityNameRepository
      .find()
      .limit(size)
      .skip(skip);

    const total = await $entityNameRepository.countDocuments();

    return {
      data: $moduleNameDBs.map(($moduleNameDB) =>
        $entityNameUtil.convert$entityNameDBTo$entityName($moduleNameDB),
      ),
      total,
    };
  }

  public static async get$entityNameById(id: string): Promise<$entityName> {
    const $moduleNameDB = await $entityNameRepository.findById(id);

    if (!$moduleNameDB) {
      throw new $entityNameNotFoundError(id);
    }

    return $entityNameUtil.convert$entityNameDBTo$entityName($moduleNameDB);
  }
}
