import { ApplicationRepository } from '../../../application';

import { $entityNameDB, $entityNameDbSchema } from './$moduleName-db';

const $entityNameRepository = ApplicationRepository<$entityNameDB>(
  '$moduleName',
  $entityNameDbSchema,
);

export default $entityNameRepository;
