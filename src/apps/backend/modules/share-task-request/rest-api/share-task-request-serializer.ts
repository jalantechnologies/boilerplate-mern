import { Account } from '../../account/types';
import { Task } from '../../task/types';
import { ShareTaskRequest } from '../types';

export function serializeSharedTaskAsJSON(sharedTask: ShareTaskRequest): object {
  const task = sharedTask.task as Task;
  const account = sharedTask.account as Account;

  function isAccount(obj: any): obj is Account {
    return obj && (obj as Account).id !== undefined;
  }

  const taskData = {
    id: task?.id,
    title: task?.title,
    description: task?.description,
    account: isAccount(task?.account)
      ? {
          id: task.account.id,
          firstName: task.account.firstName,
          lastName: task.account.lastName,
          username: task.account.username,
        }
      : (task?.account as unknown as string),
  };

  const accountData = isAccount(account)
    ? {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        username: account.username,
      }
    : (account as unknown as string);

  return {
    id: sharedTask.id,
    task: taskData,
    account: accountData,
  };
}