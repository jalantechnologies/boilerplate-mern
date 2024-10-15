import { ApplicationServer } from '../../application';

import BookingRouter from './booking-router';

export default class BookingServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new BookingRouter();

    server.use('/bookings', router.router);
  }
}
