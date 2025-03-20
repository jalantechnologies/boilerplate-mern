import { ApplicationRouter } from 'modules/application';
import { DocumentationController } from 'modules/documentation/rest-api/documentation-controller';

export default class DocumentationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new DocumentationController();

    router.get('/', ctrl.getDocumentation);
  }
}
