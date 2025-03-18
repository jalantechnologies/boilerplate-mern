import { ApplicationRepository } from '../../../application';

import { NotificationDB, NotificationDbSchema } from './notification-db';

const NotificationRepository = ApplicationRepository<NotificationDB>(
  'notifications',
  NotificationDbSchema
);

export default NotificationRepository;
