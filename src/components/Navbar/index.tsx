'use client';
import { Avatar, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import LanguageSwitcher from '../LanguageSwitcher';
import { useAppSelector } from '@/redux/hook';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const { idToken, name } = useAppSelector((state) => state.user);
  const t = useTranslations('navbar');

  return (
    <Box
      position="fixed"
      width="fill-available"
      display="flex"
      paddingY={1}
      paddingX={2}
      zIndex={2}
      alignItems="center"
      boxShadow="0 4px 8px rgba(46, 120, 189, 0.5)"
      sx={{
        backgroundImage:
          'url("https://esrasbucket.s3.eu-north-1.amazonaws.com/pexels-francesco-ungaro-2554092.jpg")',
      }}
    >
      <Image
        src="/icons/digitopiaLogoWithName.svg"
        width={100}
        height={30}
        alt="Digitopia_Logo"
        style={{
          marginLeft: 16,
        }}
      />
      {idToken && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Button
            type="button"
            sx={{
              backgroundColor: 'rgba(225, 237, 251, 0.3)',
              color: 'inherit',
              px: 2,
              mr: 4,
            }}
            href="/home"
          >
            {t('home')}
          </Button>
          <Button
            type="button"
            sx={{
              backgroundColor: 'rgba(225, 237, 251, 0.3)',
              color: 'inherit',
              px: 2,
            }}
            href="/charts"
          >
            {t('viewCharts')}
          </Button>
        </Box>
      )}
      <Box display="flex" alignItems="center" gap={2} marginLeft="auto">
        {idToken && (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            height={40}
            paddingX={1.5}
            borderRadius={4}
            sx={{ backgroundColor: 'rgba(225, 237, 251, 0.3)' }}
          >
            <Avatar sx={{ width: 30, height: 30 }} />
            <Typography textTransform="uppercase">{name}</Typography>
          </Box>
        )}

        {idToken && (
          <Button size="small" sx={{ minWidth: 0 }}>
            <Image alt="menu" width={30} height={30} src="/icons/menu.svg" />
          </Button>
        )}
        <LanguageSwitcher />
      </Box>
    </Box>
  );
};
export default Navbar;
