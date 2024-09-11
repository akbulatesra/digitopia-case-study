'use client';
import { Box, Typography } from '@mui/material';
import Form from '../../components/Form';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import useResponsive from '@/hooks/useResponsive';
import { unstable_setRequestLocale } from 'next-intl/server';
export const dynamic = 'force-dynamic';

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { idToken } = useAppSelector((state) => state.user);
  const router = useRouter();
  const t = useTranslations('page');
  const isSmDown = useResponsive('sm', 'down');

  useEffect(() => {
    idToken && router.push('/home');
  }, [idToken, router]);

  if (idToken) return null;

  return (
    <Box paddingX={isSmDown ? 2 : 10} paddingY={3}>
      <Typography variant="h3" component="h1" align="center" mb={4}>
        {t('welcome')}
      </Typography>
      <Form />
    </Box>
  );
}
