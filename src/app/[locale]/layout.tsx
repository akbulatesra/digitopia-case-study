import type { Metadata } from 'next';
import '../globals.css';
import { Box, ThemeProvider } from '@mui/material';
import { Bitter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import BlurContainer from '@/components/BlurContainer';
import ReduxProviderComponent from '../../components/ReduxProvider';
import { providerTheme } from '@/theme';
import { unstable_setRequestLocale } from 'next-intl/server';

const bitter = Bitter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digitopia Case Study',
  description: 'Digitopia Case Study by Esra Akbulat | 2024',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} className={bitter.className}>
      <ReduxProviderComponent>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider theme={providerTheme}>
            <Box
              component="body"
              margin={0}
              display="flex"
              height={'100vh'}
              sx={{
                backgroundImage:
                  'url("https://esrasbucket.s3.eu-north-1.amazonaws.com/pexels-francesco-ungaro-2554092.jpg")',
                backgroundSize: 'cover',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              <Navbar />
              <BlurContainer> {children}</BlurContainer>
            </Box>
          </ThemeProvider>
        </NextIntlClientProvider>
      </ReduxProviderComponent>
    </html>
  );
}
