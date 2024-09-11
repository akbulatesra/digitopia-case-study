'use client';
import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import 'dayjs/locale/tr';

type DateRangePickerProps = {
  startDay: dayjs.Dayjs | null;
  endDay: dayjs.Dayjs | null;
  onStartDayChange: (date: dayjs.Dayjs | null) => void;
  onEndDayChange: (date: dayjs.Dayjs | null) => void;
  submit: () => void;
} & React.ComponentProps<typeof DateCalendar>;

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDay,
  endDay,
  onStartDayChange,
  onEndDayChange,
  submit,
  minDate,
  maxDate,
}) => {
  const t = useTranslations('datePicker');

  const locale = useLocale();
  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" gap={2}>
          <Box>
            <Typography color="black">{t('start')}</Typography>
            <DateCalendar
              value={startDay}
              onChange={(date) => onStartDayChange(date)}
              minDate={minDate}
              maxDate={maxDate}
              sx={{ color: 'black' }}
            />
          </Box>
          <Box>
            <Typography color="black">{t('end')}</Typography>
            <DateCalendar
              value={endDay}
              onChange={(date) => onEndDayChange(date)}
              minDate={startDay ? startDay : minDate}
              maxDate={maxDate}
              sx={{ color: 'black' }}
            />
          </Box>
        </Box>
        <Button onClick={submit} variant="contained" sx={{ margin: 'auto' }}>
          {t('submit')}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
