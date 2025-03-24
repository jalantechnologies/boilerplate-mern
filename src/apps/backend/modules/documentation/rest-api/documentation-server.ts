import { ApplicationServer } from 'backend/modules/application';
import DocumentationRouter from 'backend/modules/documentation/rest-api/documentation-router';

export default class DocumentationServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new DocumentationRouter();

    server.use('/get-documentation', router.router);
  }
}
