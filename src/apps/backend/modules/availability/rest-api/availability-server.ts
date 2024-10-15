import { ApplicationServer } from '../../application';

import AvailabilityRouter from './availability-router';

export default class AvailabilityServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new AvailabilityRouter();

    server.use('/availabilities', router.router);
  }
}
