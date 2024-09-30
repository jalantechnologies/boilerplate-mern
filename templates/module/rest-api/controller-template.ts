import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import $entityNameService from '../service';

import { serialize$entityNameAsJSON } from './$moduleName-serializer';

export class $entityNameController {
  get$entityName = applicationController(async (_: Request, res: Response) => {
    const $moduleName = await $entityNameService.get$entityName();

    res
      .status(HttpStatusCodes.OK)
      .send($moduleName.map((data) => serialize$entityNameAsJSON(data)));
  });
}
