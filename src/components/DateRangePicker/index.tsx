'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" gap={2}>
          <Box>
            <Typography>{t('start')}</Typography>
            <DateCalendar
              value={startDay}
              onChange={(date) => onStartDayChange(date)}
              minDate={minDate}
              maxDate={maxDate}
            />
          </Box>
          <Box>
            <Typography>{t('end')}</Typography>
            <DateCalendar
              value={endDay}
              onChange={(date) => onEndDayChange(date)}
              minDate={minDate}
              maxDate={maxDate}
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
