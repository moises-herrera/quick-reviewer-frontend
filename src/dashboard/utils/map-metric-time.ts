import {
  MINUTE_IN_SECONDS,
  HOUR_IN_SECONDS,
  DAY_IN_SECONDS,
} from '@/constants/time.constants';
import { Metric } from '../interfaces/metric';

export const mapMetricTime = (metric: Metric): Metric => {
  const seconds = metric.value;

  if (seconds < MINUTE_IN_SECONDS) {
    return {
      ...metric,
      value: seconds,
      unit: 'seconds',
    };
  }

  if (seconds < HOUR_IN_SECONDS) {
    return {
      ...metric,
      value: seconds / MINUTE_IN_SECONDS,
      unit: 'minutes',
    };
  }

  if (seconds < DAY_IN_SECONDS) {
    return {
      ...metric,
      value: seconds / HOUR_IN_SECONDS,
      unit: 'hours',
    };
  }

  return {
    ...metric,
    value: seconds / DAY_IN_SECONDS,
    unit: 'days',
  };
};
