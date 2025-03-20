import { ApplicationRepository } from 'modules/application';
import { TaskDB, TaskDbSchema } from 'modules/task/internal/store/task-db';

const TaskRepository = ApplicationRepository<TaskDB>('Task', TaskDbSchema);

export default TaskRepository;
