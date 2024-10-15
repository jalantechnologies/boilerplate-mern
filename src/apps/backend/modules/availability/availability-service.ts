import { DateUtils } from '../util/date-utils';

import { mockAvailabilityData } from './mockdata';

export default class AvailabilityService {
  static async getAvailability(startDate: string, showForDays: number) {
    const startMoment = DateUtils.parseDate(startDate);
    const days = showForDays || 7;
    return Promise.resolve(mockAvailabilityData(startMoment, days));
  }
}
