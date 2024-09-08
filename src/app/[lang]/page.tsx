import { Box, Typography } from '@mui/material';
import Form from '../../components/Form';
import BlurContainer from '../../components/BlurContainer';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('page');

  return (
    <BlurContainer maxWidth="sm" isAuth={false}>
      <Box paddingX={10} paddingY={3}>
        <Typography variant="h3" component="h1" align="center" mb={4}>
          {t('welcome')}
        </Typography>
        <Form />
      </Box>
    </BlurContainer>
  );
}
