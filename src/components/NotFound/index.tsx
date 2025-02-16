'use client';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import useResponsive from '@/hooks/useResponsive';

const errorImage =
  'https://esrasbucket.s3.eu-north-1.amazonaws.com/ghost+(1).png';

const NotFoundPage = () => {
  const t = useTranslations('not-found');
  const isSmDown = useResponsive('sm', 'down');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={isSmDown ? 2 : 4}
      py={isSmDown ? 2 : 4}
    >
      <Image
        src={errorImage}
        width={isSmDown ? 150 : 200}
        height={isSmDown ? 150 : 200}
        alt="ghost"
      />
      <Typography
        fontSize={isSmDown ? 30 : 40}
        color="black"
        fontWeight="bold"
        textAlign="center"
      >
        {t('notFound')}
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: 'black', marginTop: isSmDown ? 3 : 6 }}
      >
        <Link href={'/'}>{t('returnHome')}</Link>
      </Button>
    </Box>
  );
};
export default NotFoundPage;
