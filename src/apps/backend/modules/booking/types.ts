export class ToolCallFunctionArguments {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  availability: string;
}

export class ToolCall {
  id: string;
  function: {
    arguments: ToolCallFunctionArguments;
    name: string;
  };
}

export class BookingCustomRequestBody {
  message: {
    toolCalls: ToolCall[];
  };
}

export class Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export class Booking {
  firstName: string;
  phoneNumber: string;
  address: string;
  availability: string;
}
