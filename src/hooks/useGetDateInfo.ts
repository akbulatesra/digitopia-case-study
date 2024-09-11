import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/en-gb';

dayjs.extend(weekOfYear);

export const useGetDateInfo = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
) => {
  const startMonth = startDate.format('MMM');
  const endMonth = endDate.format('MMM');

  const startWeek = startDate.diff(startDate.startOf('month'), 'week') + 1;
  const endWeek = endDate.diff(endDate.startOf('month'), 'week') + 1;
  return {
    startMonth,
    endMonth,
    startWeek,
    endWeek,
  };
};
