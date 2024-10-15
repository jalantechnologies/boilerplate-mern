export class ToolCallFunctionArguments {
  startDate: string;
  showForDays: string;
}

export class ToolCall {
  id: string;
  function: {
    arguments: ToolCallFunctionArguments;
    name: string;
  };
}

export class AvailabilityCustomRequestBody {
  message: {
    toolCalls: ToolCall[];
  };
}
