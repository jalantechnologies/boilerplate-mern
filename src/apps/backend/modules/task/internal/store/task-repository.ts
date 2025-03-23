import { ApplicationRepository } from 'backend/modules/application';
import {
  TaskDB,
  TaskDbSchema,
} from 'backend/modules/task/internal/store/task-db';

const TaskRepository = ApplicationRepository<TaskDB>('Task', TaskDbSchema);

export default TaskRepository;
