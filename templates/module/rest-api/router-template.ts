import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { $entityNameController } from './$moduleName-controller';

export default class $entityNameRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new $entityNameController();

    router.use(accessAuthMiddleware);

    const baseUrl='$baseUrl'

    router.get(`${baseUrl}/`, ctrl.get$entityName);
    router.get(`${baseUrl}/:id`, ctrl.get$entityNameById);

    router.post(`${baseUrl}/`, ctrl.create$entityName);
    router.patch(`${baseUrl}/:id`, ctrl.update$entityName);
    router.delete(`${baseUrl}/:id`, ctrl.delete$entityName);
  }
}
