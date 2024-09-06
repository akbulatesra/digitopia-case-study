import { Box, Typography } from '@mui/material';
import Form from '@/components/Form';
import BlurContainer from '@/components/BlurContainer';

export default function Home() {
  return (
    <BlurContainer maxWidth="sm">
      <Box paddingX={10} paddingY={3}>
        <Typography variant="h3" component="h1" align="center" mb={4}>
          Welcome
        </Typography>
        <Form />
      </Box>
    </BlurContainer>
  );
}
