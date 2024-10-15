import { Moment } from 'moment';

import { DateUtils } from '../util/date-utils';

export const mockAvailabilityData = (
  startDate: Moment,
  showForDays: number,
) => {
  const bookingWindows = [];

  for (let i = 0; i < showForDays; i += 1) {
    const date = DateUtils.addDays(startDate, i).format('YYYY-MM-DD');

    const timeSlots = [
      {
        start_time: DateUtils.parseDate(`${date} 09:00 AM`).toISOString(),
        end_time: DateUtils.parseDate(`${date} 10:00 AM`).toISOString(),
        available: Math.random() > 0.5,
      },
      {
        start_time: DateUtils.parseDate(`${date} 11:00 AM`).toISOString(),
        end_time: DateUtils.parseDate(`${date} 12:00 PM`).toISOString(),
        available: Math.random() > 0.5,
      },
      {
        start_time: DateUtils.parseDate(`${date} 02:00 PM`).toISOString(),
        end_time: DateUtils.parseDate(`${date} 03:00 PM`).toISOString(),
        available: Math.random() > 0.5,
      },
    ];

    const availableSlots = timeSlots.filter((slot) => slot.available);
    bookingWindows.push(...availableSlots);
  }

  return {
    booking_windows: bookingWindows,
    show_for_days: showForDays,
    start_date: DateUtils.formatDate(startDate),
  };
};
