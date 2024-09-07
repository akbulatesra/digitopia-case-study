import { Box, Typography } from '@mui/material';
import Form from '../../components/Form';
import BlurContainer from '../../components/BlurContainer';
import { useTranslations } from 'next-intl';
import NonAuthLanguageContainer from '@/components/NonAuthLanguageContainer';

export default function Home() {
  const t = useTranslations('page');

  return (
    <NonAuthLanguageContainer>
      <BlurContainer maxWidth="sm">
        <Box paddingX={10} paddingY={3}>
          <Typography variant="h3" component="h1" align="center" mb={4}>
            {t('welcome')}
          </Typography>
          <Form />
        </Box>
      </BlurContainer>
    </NonAuthLanguageContainer>
  );
}
