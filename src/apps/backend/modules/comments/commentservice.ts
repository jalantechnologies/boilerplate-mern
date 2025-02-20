import CommentReader from './internal/reader';
import CommentWriter from './internal/writer';
import { Comment } from './types';

export class CommentService {
  private commentReader: CommentReader;
  private commentWriter: CommentWriter;

  constructor(commentModel: any) {
    this.commentReader = new CommentReader(commentModel);
    this.commentWriter = new CommentWriter(commentModel);
  }

  public async getCommentsByTask(taskId: string): Promise<Comment[]> {
    return this.commentReader.getCommentsByTask(taskId);
  }

  public async addComment(taskId: string, userId: string, content: string) {
    return this.commentWriter.createComment(taskId, userId, content);
  }

  public async editComment(commentId: string, content: string) {
    return this.commentWriter.updateComment(commentId, content);
  }

  public async removeComment(commentId: string) {
    return this.commentWriter.deleteComment(commentId);
  }
}
