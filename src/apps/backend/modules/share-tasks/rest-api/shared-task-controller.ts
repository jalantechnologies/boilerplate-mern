import { Request, Response } from 'express';
import TaskSharingService from '../task-sharing-service';
import { HttpStatusCodes } from '../../http';
import { applicationController } from '../../application';
import { formatTaskSharingToJSON } from './task-sharing-serializer';
import { CreateTaskSharingParams } from '../types';

export class TaskSharingController {
  shareTask = applicationController(
    async (req: Request<{}, {}, CreateTaskSharingParams>, res: Response) => {
      const taskSharingRecord = await TaskSharingService.shareTask({
        taskId: req.body.taskId,
        userId: req.body.userId,
      })
      res.status(HttpStatusCodes.CREATED).send(formatTaskSharingToJSON(taskSharingRecord))
    },
  )

  getSharedTasks = applicationController(
    async (req: Request<{ userId: string }>, res: Response) => {
      const taskSharingRecords = await TaskSharingService.getSharedTasks({
        userId: req.params.userId,
      })
      res.status(HttpStatusCodes.OK).send(taskSharingRecords.map(formatTaskSharingToJSON))
    },
  )
}
