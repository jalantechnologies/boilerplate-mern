import { ShareTaskRequest } from '../types';
import { ShareTaskRequestDB } from './store/share-task-request-db';
import { Task } from '../../task/types';
import { Account } from '../../account/types';
import { Types } from 'mongoose';

export default class ShareTaskRequestUtil {
  public static convertShareTaskDBRequestToShareTaskRequest(
    shareTaskRequestDb: ShareTaskRequestDB
  ): ShareTaskRequest {
    return {
      id: shareTaskRequestDb._id.toString(),
      task: this.convertTask(shareTaskRequestDb.task),
      account: this.convertAccount(shareTaskRequestDb.account),
    } as ShareTaskRequest;
  }

  private static convertTask(task: Types.ObjectId | Task): string | Task {
    return Types.ObjectId.isValid(task.toString())
      ? task.toString()
      : {
          id: (task as Task).id,
          account: (task as Task).account,
          description: (task as Task).description,
          title: (task as Task).title,
        };
  }

  private static convertAccount(account: Types.ObjectId | Account): string | Account {
    return Types.ObjectId.isValid(account.toString())
      ? account.toString()
      : {
          id: (account as Account).id,
          firstName: (account as Account).firstName,
          lastName: (account as Account).lastName,
          username: (account as Account).username,
          hashedPassword: (account as Account).hashedPassword,
          phoneNumber: (account as Account).phoneNumber,
        };
  }
}