import { ApplicationRepository } from '../../../application';

import { TaskDB, TaskDbSchema } from './task-db';

const TaskRepository = ApplicationRepository<TaskDB>('Task', TaskDbSchema);

export default TaskRepository;
