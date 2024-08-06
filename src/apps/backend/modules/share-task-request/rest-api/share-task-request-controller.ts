import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import ShareTaskRequestService from '../share-task-request-service';
import {
    CreateShareTasksRequestParams,
} from '../types';
import { serializeSharedTaskAsJSON } from './share-task-request-serializer';

export class ShareTaskRequestController {
  createSharedTaskRequest = applicationController(
    async (req: Request<CreateShareTasksRequestParams>, res: Response) => {
      const { taskId, accountIds } = req.body;
      const sharedTasks = await Promise.all(
        accountIds.map((accountId) => 
          ShareTaskRequestService.createSharedTaskRequest({ taskId, accountId })
        )
      );
      const sharedTasksJSON = sharedTasks.map(serializeSharedTaskAsJSON);

      res.status(HttpStatusCodes.CREATED).send(sharedTasksJSON);
    },
  );
}