import { ApplicationError, HttpStatusCodes } from '../application';

export enum OpenAIErrorCode {
  ERROR_GETTING_CHAT_COMPLETION_RESPONSE = 'OPENAI_ERR_01',
}

export class ErrorGettingChatCompletionResponse extends ApplicationError {
  code: OpenAIErrorCode;

  constructor() {
    super(
      `There was an error getting the chat completion response from OpenAI, please try again later.`
    );
    this.code = OpenAIErrorCode.ERROR_GETTING_CHAT_COMPLETION_RESPONSE;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}
