import { ShareTaskRequest, CreateShareTaskRequestParams, ShareTaskRequestStatus } from '../types';

import ShareTaskRequestRepository from './store/share-task-request-repository';
import ShareTaskRequestUtil from './share-task-request-util';

export default class ShareTaskRequestWriter {
  public static async createSharedTaskRequest(
    params: CreateShareTaskRequestParams,
  ): Promise<ShareTaskRequest> {
    const createdSharedTaskRequest = await ShareTaskRequestRepository.create({
      task: params.taskId,
      account: params.accountId,
      status: ShareTaskRequestStatus.Approved,
    });
    return ShareTaskRequestUtil.convertShareTaskDBRequestToShareTaskRequest(createdSharedTaskRequest);
  }
}