import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import ShareTaskService from '../share-task-service';
import { ShareTask, CreateShareTaskParams, CantShareTaskError } from '../types';

import { serializeShareTaskAsJSON } from './share-task-serializer';

export class ShareTaskController {
  createShareTask = applicationController(
    async (req: Request<CreateShareTaskParams>, res: Response) => {
      if (req.accountId === req.body.sharedWith) {
        throw new CantShareTaskError('Cannot share with yourself');
      } else {
        const shareTask: ShareTask = await ShareTaskService.createShareTask({
          accountId: req.accountId,
          sharedWith: req.body.sharedWith,
          taskId: req.body.taskId,
        });
        const shareTaskJSON = serializeShareTaskAsJSON(shareTask);

        res.status(HttpStatusCodes.CREATED).send(shareTaskJSON);
      }
    }
  );
}
