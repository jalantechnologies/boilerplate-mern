import $entityNameReader from './internals/$moduleName-reader';
import $entityNameWriter from './internals/$moduleName-writer';

import { $entityName, Get$entityNameParams, PaginatedResponse } from './types';

export default class $moduleNameService {
  public static get$entityNames({
    page,
    size,
  }: Get$entityNameParams): Promise<PaginatedResponse<$entityName>> {
    return $entityNameReader.get$entityNames({
      page: page || 1,
      size: size || $defaultPageSize,
    });
  }

  public static get$entityNameById(id: string): Promise<$entityName> {
    return $entityNameReader.get$entityNameById(id);
  }

  public static create$entityName(
    $moduleName: $entityName,
  ): Promise<$entityName> {
    return $entityNameWriter.create$entityName($moduleName);
  }

  public static update$entityName(
    id: string,
    $moduleName: $entityName,
  ): Promise<$entityName> {
    return $entityNameWriter.update$entityName(id, $moduleName);
  }

  public static delete$entityName(id: string): Promise<void> {
    return $entityNameWriter.delete$entityName(id);
  }
}
