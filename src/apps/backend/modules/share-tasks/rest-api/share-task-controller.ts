import { Request, Response } from 'express';
import SharedTaskService from '../share-task-service';
import { HttpStatusCodes } from '../../http';
import { applicationController } from '../../application';
import { serializeSharedTaskAsJSON } from './share-task-serializer';
import { CreateSharedTaskParams } from '../types';

export class SharedTaskController {
  shareTask = applicationController(
    async (req: Request<{}, {}, CreateSharedTaskParams>, res: Response) => {
      const sharedTaskDB = await SharedTaskService.shareTask({
        taskId: req.body.taskId,
        accountId: req.body.accountId,
      });
      const sharedTaskJSON = serializeSharedTaskAsJSON(sharedTaskDB);

      res.status(HttpStatusCodes.CREATED).send(sharedTaskJSON);
    },
  );

  getSharedTasks = applicationController(
    async (req: Request<{ accountId: string }>, res: Response) => {
      const sharedTasksDB = await SharedTaskService.getSharedTask({
        accountId: req.params.accountId,
      });
      const sharedTasksJSON = sharedTasksDB.map(serializeSharedTaskAsJSON);

      res.status(HttpStatusCodes.OK).send(sharedTasksJSON);
    },
  );
}
