import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const errorImage =
  'https://esrasbucket.s3.eu-north-1.amazonaws.com/ghost+(1).png';

const NotFound = () => {
  const t = useTranslations('not-found');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      py={4}
    >
      <Image src={errorImage} width={200} height={200} alt="ghost" />
      <Typography fontSize={40} color="black" fontWeight="bold">
        {t('notFound')}
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: 'black', marginTop: 6 }}
      >
        <Link href={'/'}>{t('returnHome')}</Link>
      </Button>
    </Box>
  );
};
export default NotFound;
