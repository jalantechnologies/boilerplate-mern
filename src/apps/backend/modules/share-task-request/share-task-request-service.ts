import ShareTaskRequestReader from './internal/share-task-request-reader';
import ShareTaskRequestWriter from './internal/share-task-request-writer';
import {
  CreateShareTaskRequestParams,
  GetAllShareTasksRequestParams,
  ShareTaskRequest,
} from './types';

export default class ShareTaskRequestService {
  public static async createSharedTaskRequest(
    params: CreateShareTaskRequestParams,
  ): Promise<ShareTaskRequest> {
    return ShareTaskRequestWriter.createSharedTaskRequest(params);
  }

  public static async getSharedTaskRequestsForAccount(
    params: GetAllShareTasksRequestParams,
  ): Promise<ShareTaskRequest[]> {
    return ShareTaskRequestReader.getSharedTaskRequestsForAccount(params);
  }
}