import type { Metadata } from 'next';
import './globals.css';
import ProviderComponent from '@/components/Provider';
import { Box } from '@mui/material';
import { Bitter } from 'next/font/google';

const bitter = Bitter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digitopia Case Study',
  description: 'Digitopia Case Study by Esra Akbulat | 2024',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bitter.className}>
      <ProviderComponent>
        <Box
          component="body"
          margin={0}
          minHeight={'100vh'}
          display="flex"
          sx={{
            backgroundImage:
              'url("https://esrasbucket.s3.eu-north-1.amazonaws.com/pexels-francesco-ungaro-2554092.jpg")',
            backgroundSize: 'cover',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {children}
        </Box>
      </ProviderComponent>
    </html>
  );
}
