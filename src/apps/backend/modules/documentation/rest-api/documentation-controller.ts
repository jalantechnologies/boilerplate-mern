import {
  applicationController,
  HttpStatusCodes,
  Request,
  Response,
} from 'modules/application';
import { DocumentationService } from 'modules/documentation';
import { serializeDocumentationAsJSON } from 'modules/documentation/rest-api/documentation-serializer';

export class DocumentationController {
  getDocumentation = applicationController(
    async (_req: Request, res: Response) => {
      const documentation = await DocumentationService.getDocumentation();

      const documentationJSON = serializeDocumentationAsJSON(documentation);

      res.status(HttpStatusCodes.OK).send(documentationJSON);
    }
  );
}
