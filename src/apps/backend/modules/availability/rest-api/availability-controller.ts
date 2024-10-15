import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import AvailabilityService from '../availability-service';
import { AvailabilityCustomRequestBody } from '../types';

export class AvailabilityController {
  getAvailability = applicationController(
    async (req: Request<AvailabilityCustomRequestBody>, res: Response) => {
      const toolCall = req.body.message.toolCalls[0];
      const { startDate, showForDays } = toolCall.function.arguments;

      const availability = await AvailabilityService.getAvailability(
        startDate,
        parseInt(showForDays, 10),
      );

      res.status(HttpStatusCodes.OK).send({
        results: [
          {
            toolCallId: toolCall.id,
            result: `Available slots for the next ${showForDays} days starting from ${startDate}: ${JSON.stringify(availability)}`,
          },
        ],
      });
    },
  );
}
