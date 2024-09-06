import BlurContainer from '@/components/BlurContainer';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const errorImage =
  'https://esrasbucket.s3.eu-north-1.amazonaws.com/ghost+(1).png';

const NotFound = () => {
  return (
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
          Page Not Found
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', marginTop: 6 }}
        >
          <Link href={'/home'}>Return Home</Link>
        </Button>
      </Box>
    </BlurContainer>
  );
};
export default NotFound;
