import $entityNameRepository from './store/$moduleName-repository';
import { $entityName, $entityNameNotFoundError } from '../types';
import $entityNameUtil from './$moduleName-util';

export default class $entityNameWriter {
  public static async create$entityName(
    $moduleName: $entityName,
  ): Promise<$entityName> {
    const created$moduleName = await $entityNameRepository.create($moduleName);

    return $entityNameUtil.convert$entityNameDBTo$entityName(
      created$moduleName,
    );
  }

  public static async update$entityName(
    id: string,
    $moduleName: $entityName,
  ): Promise<$entityName> {
    const updated$moduleName = await $entityNameRepository.findByIdAndUpdate(
      id,
      $moduleName,
      { new: true },
    );

    if (!updated$moduleName) {
      throw new $entityNameNotFoundError(id);
    }

    return $entityNameUtil.convert$entityNameDBTo$entityName(
      updated$moduleName,
    );
  }

  public static async delete$entityName(id: string): Promise<void> {
    await $entityNameRepository.findByIdAndDelete(id);
  }
}
