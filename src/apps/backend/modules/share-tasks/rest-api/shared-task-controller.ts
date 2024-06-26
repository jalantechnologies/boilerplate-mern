//shared-task-controller.ts

import { Request, Response } from 'express';
import SharedTaskService from '../internal/share-task-service';
import { Types } from 'mongoose';
import { HttpStatusCodes } from '../../http';
import { applicationController } from '../../application';

interface ExtendedRequest extends Request {
  accountId?: string;
}

export class SharedTaskController {
  shareTask = applicationController(
    async (req: ExtendedRequest, res: Response) => {
      const { taskId } = req.params; // taskId from URL params
      const { accountId } = req.body; // accountId from request body
      const taskObjectId = new Types.ObjectId(taskId);
      const accountObjectId = new Types.ObjectId(accountId);

      await SharedTaskService.shareTask(taskObjectId, accountObjectId);
      res
        .status(HttpStatusCodes.CREATED)
        .send({ message: 'Task shared successfully' });
    },
  );

  getSharedTasks = applicationController(
    async (req: ExtendedRequest, res: Response) => {
      const accountId = req.accountId;

      if (!accountId) {
        res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send({ message: 'Account ID is missing' });
        return;
      }

      const sharedTasks = await SharedTaskService.getSharedTasks(
        new Types.ObjectId(accountId),
      );
      res.status(HttpStatusCodes.OK).send(sharedTasks);
    },
  );
}