import {
  applicationController,
  HttpStatusCodes,
  Request,
  Response,
} from 'backend/modules/application';
import { DocumentationService } from 'backend/modules/documentation';
import { serializeDocumentationAsJSON } from 'backend/modules/documentation/rest-api/documentation-serializer';

export class DocumentationController {
  getDocumentation = applicationController(
    async (_req: Request, res: Response) => {
      const documentation = await DocumentationService.getDocumentation();

      const documentationJSON = serializeDocumentationAsJSON(documentation);

      res.status(HttpStatusCodes.OK).send(documentationJSON);
    }
  );
}
