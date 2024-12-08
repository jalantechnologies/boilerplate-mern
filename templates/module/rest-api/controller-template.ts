import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import $entityNameService from '../service';
import { $entityName } from '../types';

import { serialize$entityNameAsJSON } from './$moduleName-serializer';

export class $entityNameController {
  get$entityName = applicationController(
    async (req: Request, res: Response) => {
      const page = +req.query.page;
      const size = +req.query.size;

      const { data: $moduleNames, total } =
        await $entityNameService.get$entityNames({ page, size });

      res.setHeader('X-Total-Count', total.toString());
      res
        .status(HttpStatusCodes.OK)
        .send(
          $moduleNames.map(($moduleName) =>
            serialize$entityNameAsJSON($moduleName),
          ),
        );
    },
  );

  get$entityNameById = applicationController(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const $moduleName = await $entityNameService.get$entityNameById(id);

      res
        .status(HttpStatusCodes.OK)
        .send(serialize$entityNameAsJSON($moduleName));
    },
  );

  create$entityName = applicationController(
    async (req: Request, res: Response) => {
      const $moduleName = req.body as $entityName;

      const created$moduleName =
        await $entityNameService.create$entityName($moduleName);

      res
        .status(HttpStatusCodes.CREATED)
        .send(serialize$entityNameAsJSON(created$moduleName));
    },
  );

  update$entityName = applicationController(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const $moduleName = req.body as $entityName;

      const updated$moduleName = await $entityNameService.update$entityName(
        id,
        $moduleName,
      );

      res
        .status(HttpStatusCodes.OK)
        .send(serialize$entityNameAsJSON(updated$moduleName));
    },
  );

  delete$entityName = applicationController(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      await $entityNameService.delete$entityName(id);

      res.status(HttpStatusCodes.NO_CONTENT).send();
    },
  );
}
