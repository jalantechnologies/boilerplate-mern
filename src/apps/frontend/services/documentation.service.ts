import { ApiError, ApiResponse } from '../types';
import { JsonObject } from '../types/common-types';
import { MarkdownDocumentation } from '../types/documentation';

import APIService from './api.service';

export default class DocumentationService extends APIService {
  getDocumentation = async (): Promise<ApiResponse<MarkdownDocumentation>> => {
    try {
      const response = await this.apiClient.get('/get-documentation');

      return new ApiResponse(
        new MarkdownDocumentation(response.data as JsonObject),
        undefined
      );
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };
}
