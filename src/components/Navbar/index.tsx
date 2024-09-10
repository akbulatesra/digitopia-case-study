'use client';
import { Avatar, Box, Button, Popover, Typography } from '@mui/material';
import Image from 'next/image';
import LanguageSwitcher from '../LanguageSwitcher';
import { useAppSelector } from '@/redux/hook';
import { useTranslations } from 'next-intl';
import RightSidePanel from '../RightSideBar';
import ProfileInfo from '../ProfileInfo';
import { useState } from 'react';
import useResponsive from '@/hooks/useResponsive';
import { Menu } from '@mui/icons-material';
import Link from 'next/link';

const Navbar = () => {
  const { idToken, name } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const openMenu = Boolean(anchorEl);

  const t = useTranslations('navbar');
  const isMdDown = useResponsive('md', 'down');

  const handleRightPanel = () => {
    setOpen(true);
  };
  const closeRightPanel = () => {
    setOpen(false);
  };

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
      {
        <RightSidePanel
          children={<ProfileInfo close={closeRightPanel} />}
          onClose={closeRightPanel}
          isOpen={open}
        />
      }
      <Image
        src="/icons/digitopiaLogoWithName.svg"
        width={100}
        height={30}
        alt="Digitopia_Logo"
        style={{
          marginLeft: 16,
        }}
      />
      {idToken && !isMdDown && (
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
        {idToken && !isMdDown && (
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
          <Button size="small" sx={{ minWidth: 0 }} onClick={handleRightPanel}>
            <Image alt="menu" width={30} height={30} src="/icons/menu.svg" />
          </Button>
        )}
        {isMdDown ? (
          <Button
            size="small"
            sx={{ margin: 0, minWidth: 0 }}
            onClick={handleMenuClick}
          >
            <Menu sx={{ width: 30, height: 30 }} />
          </Button>
        ) : (
          <LanguageSwitcher />
        )}
      </Box>
      <Popover
        open={openMenu}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ width: '100%' }}
      >
        <Box display="flex" flexDirection="column" gap={1} padding={1}>
          <Link href="/home">{t('home')}</Link>
          <Link href="/charts">{t('viewCharts')}</Link>
          <LanguageSwitcher />
        </Box>
      </Popover>
    </Box>
  );
};
export default Navbar;
