import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { $entityNameController } from './$moduleName-controller';

export default class $entityNameRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new $entityNameController();

    router.use(accessAuthMiddleware);

    // Define get routes
    router.get('/', ctrl.get$entityName);
    router.get('/:id', ctrl.get$entityNameById);

    // Define post routes here
    router.post('/', ctrl.create$entityName);
    router.patch('/:id', ctrl.update$entityName);
    router.delete('/:id', ctrl.delete$entityName);
  }
}
