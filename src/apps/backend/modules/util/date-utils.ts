import moment, { Moment } from 'moment';

export class DateUtils {
  static parseDate(dateString?: string): Moment {
    return dateString ? moment(dateString, 'YYYY-MM-DD') : moment();
  }

  static addDays(date: Moment, days: number): Moment {
    return date.clone().add(days, 'days');
  }

  static formatDate(date: Moment): string {
    return date.format('YYYY-MM-DD');
  }
}
