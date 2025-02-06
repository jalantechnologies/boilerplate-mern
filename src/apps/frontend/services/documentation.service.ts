import { ApiError, ApiResponse } from '../types';
import { JsonObject, Nullable } from '../types/common';
import { MarkdownDocumentation } from '../types/documentation';

import APIService from './api.service';

export default class DocumentationService extends APIService {
  getDocumentation = async (): Promise<
    ApiResponse<Nullable<MarkdownDocumentation>>
  > => {
    try {
      const response = await this.apiClient.get('/get-documentation');

      return new ApiResponse(
        new MarkdownDocumentation(response.data as JsonObject),
        undefined,
      );
    } catch (e) {
      return new ApiResponse(null, new ApiError(e.response.data as JsonObject));
    }
  };
}
