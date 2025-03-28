import APIService from 'frontend/services/api.service';
import { ApiError, ApiResponse } from 'frontend/types';
import { JsonObject } from 'frontend/types/common-types';
import { MarkdownDocumentation } from 'frontend/types/documentation';

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
