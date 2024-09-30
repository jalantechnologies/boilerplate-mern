import { ApplicationRouter } from '../../application';

import { $entityNameController } from './$moduleName-controller';

export default class $entityNameRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new $entityNameController();

    router.get('/', ctrl.get$entityName);
  }
}
