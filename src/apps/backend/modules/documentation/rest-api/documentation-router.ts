import { ApplicationRouter } from '../../application';

import { DocumentationController } from './documentation-controller';

export default class DocumentationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new DocumentationController();

    router.get('/', ctrl.getDocumentation);
  }
}
