import { $entityName } from '../types';

import { $entityNameDB } from './store/$moduleName-db';

export default class $entityNameUtil {
  public static convert$entityNameDBTo$entityName(
    $moduleNameDb: $entityNameDB,
  ): $entityName {
    const $moduleName = new $entityName();

    $moduleName.id = $moduleNameDb._id.toString();

    return $moduleName;
  }
}
