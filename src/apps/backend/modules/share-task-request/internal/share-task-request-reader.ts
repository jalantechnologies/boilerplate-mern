import {
    GetAllShareTasksRequestParams,
    GetShareTaskRequestParams,
    ShareTaskRequest,
    ShareTaskRequestNotFoundError,
  } from '../types';
  import ShareTaskRequestRepository from './store/share-task-request-repository';
  import ShareTaskRequestUtil from './share-task-request-util';
  
  export default class ShareTaskRequestReader {
    public static async getSharedTaskRequestForAccount(
      params: GetShareTaskRequestParams,
    ): Promise<ShareTaskRequest> {
      const shareTaskRequestDb = await ShareTaskRequestRepository.findOne({
        _id: params.sharedTaskId,
        account: params.accountId,
      })
      
      if (!shareTaskRequestDb) {
        throw new ShareTaskRequestNotFoundError(params.sharedTaskId);
      }
  
      return ShareTaskRequestUtil.convertShareTaskDBRequestToShareTaskRequest(shareTaskRequestDb);
    }
  
    public static async getSharedTaskRequestsForAccount(
      params: GetAllShareTasksRequestParams,
    ): Promise<ShareTaskRequest[]> {
      const shareTasksRequestDb = await ShareTaskRequestRepository.find({
        account: params.accountId,
      })
        .populate({
          path: 'task',
          match: { active: true },
          populate: {
            path: 'account',
            model: 'accounts',
          },
        })
  
      return shareTasksRequestDb.map((shareTaskRequestDb) =>
        ShareTaskRequestUtil.convertShareTaskDBRequestToShareTaskRequest(shareTaskRequestDb),
        );
    }
  }