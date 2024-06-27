import { Router } from 'express';
import { SharedTaskController } from './shared-task-controller';
import { accessAuthMiddleware } from '../../access-token';

const router = Router();
const controller = new SharedTaskController();

router.use(accessAuthMiddleware);

router.post('/tasks/:taskId/share', controller.shareTask);
router.get('/shared-tasks', controller.getSharedTasks);

export default router;
