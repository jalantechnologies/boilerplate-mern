import { Comment } from '../types';
import { CommentDB } from './store/comment-db';
import { Account } from '../../account/types';
import { Types } from 'mongoose';

export default class CommentUtil {
  public static convertCommentDBToComment(commentDb: CommentDB): Comment {
    const account = CommentUtil.convertAccount(commentDb.account);
    const comment = new Comment(
      commentDb._id.toString(),
      commentDb.task.toString(),
      account,
      commentDb.comment,
      commentDb.createdAt,
      commentDb.updatedAt,
    );
    return comment;
  }

  private static convertAccount(
    account: Types.ObjectId | Account,
  ): string | Account {
    if (Types.ObjectId.isValid(account.toString())) {
      return account.toString();
    } else {
      const acc = account as Account;
      return {
        id: acc.id,
        firstName: acc.firstName,
        lastName: acc.lastName,
        username: acc.username,
        hashedPassword: acc.hashedPassword,
        phoneNumber: acc.phoneNumber,
      } as Account;
    }
  }
}