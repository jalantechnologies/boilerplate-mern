import { ApplicationServer } from '../../application';

import DocumentationRouter from './documentation-router';

export default class DocumentationServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new DocumentationRouter();

    server.use('/get-documentation', router.router);
  }
}
