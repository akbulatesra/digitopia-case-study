'use client';
import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/redux/hook';
import useResponsive from '@/hooks/useResponsive';
import { unstable_setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations('home');
  const { name } = useAppSelector((state) => state.user);
  const isSmDown = useResponsive('sm', 'down');

  return (
    <Box display="flex" flexDirection="column" gap={isSmDown ? 5 : 10}>
      <Typography
        variant="h1"
        align="center"
        sx={{
          background: 'linear-gradient(0deg, #f3b3f0, #758ef0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginX: 'auto',
        }}
      >
        {t('hello', { name: name })}
      </Typography>
      <Button
        size="large"
        type="button"
        variant="outlined"
        sx={{
          background: 'linear-gradient(0deg, #f3b3f0, #758ef0)',
          paddingX: 4,
          margin: 'auto',
        }}
        href="/charts"
      >
        {t('viewCharts')}
      </Button>
    </Box>
  );
};
export default Home;
