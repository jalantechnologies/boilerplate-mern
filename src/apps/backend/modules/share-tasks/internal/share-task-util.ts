import  SharedTask  from '../types';
import  {SharedTaskDB}  from './store/task-sharing-db';

export default class ShareTaskUtil {
  public static convertSharedTaskDBToSharedTask(sharedTaskDb: SharedTaskDB): SharedTask {
    return {
      id: sharedTaskDb._id.toString(),
      taskId: sharedTaskDb.task.toString(),
      accountId: sharedTaskDb.account.toString(),
    };
  }
}
