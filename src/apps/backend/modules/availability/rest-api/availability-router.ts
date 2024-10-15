import { ApplicationRouter } from '../../application';

import { AvailabilityController } from './availability-controller';

export default class AvailabilityRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new AvailabilityController();

    router.post('/', ctrl.getAvailability);
  }
}
