import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import DocumentationService from '../documentation-service';

import { serializeDocumentationAsJSON } from './documentation-serializer';

export class DocumentationController {
  getDocumentation = applicationController(
    async (_req: Request, res: Response) => {
      const documentation = await DocumentationService.getDocumentation();

      const documentationJSON = serializeDocumentationAsJSON(documentation);

      res.status(HttpStatusCodes.OK).send(documentationJSON);
    },
  );
}
