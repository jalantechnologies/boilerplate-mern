import { ApplicationRouter } from '../../application';

import { BookingController } from './booking-controller';

export default class BookingRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new BookingController();
    // make validator in service and pass here
    router.post('/', ctrl.createBooking);
  }
}
