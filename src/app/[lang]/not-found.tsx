import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import BlurContainer from '../../components/BlurContainer';
import { useTranslations } from 'next-intl';
import NonAuthLanguageContainer from '@/components/NonAuthLanguageContainer';

const errorImage =
  'https://esrasbucket.s3.eu-north-1.amazonaws.com/ghost+(1).png';

const NotFound = () => {
  const t = useTranslations('not-found');

  return (
    <NonAuthLanguageContainer>
      <BlurContainer>
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
            <Link href={'/home'}>{t('returnHome')}</Link>
          </Button>
        </Box>
      </BlurContainer>
    </NonAuthLanguageContainer>
  );
};
export default NotFound;
