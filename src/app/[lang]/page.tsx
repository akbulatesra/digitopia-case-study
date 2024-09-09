'use client';
import { Box, Typography } from '@mui/material';
import Form from '../../components/Form';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { idToken } = useAppSelector((state) => state.user);
  const router = useRouter();

  const t = useTranslations('page');
  useEffect(() => {
    idToken && router.push('/home');
  }, []);

  if (idToken) return null;

  return (
    <Box paddingX={10} paddingY={3}>
      <Typography variant="h3" component="h1" align="center" mb={4}>
        {t('welcome')}
      </Typography>
      <Form />
    </Box>
  );
}
