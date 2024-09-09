'use client';
import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/redux/hook';

const Home = () => {
  const t = useTranslations('home');
  const { name } = useAppSelector((state) => state.user);

  return (
    <Box display="flex" flexDirection="column" gap={10}>
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
