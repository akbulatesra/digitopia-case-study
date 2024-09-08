'use client';
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';
import { usePathname, useRouter } from '@/i18n/routing';
import { Locale } from '@/types';
import { useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';

interface LanguageSwitcherProps {
  sx?: SxProps<Theme>;
}

const LanguageSwitcher = ({ sx }: LanguageSwitcherProps) => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('languages');

  const handleChange = (event: SelectChangeEvent) => {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Select
      id="select"
      labelId="select-label"
      label="Age"
      onChange={handleChange}
      disabled={isPending}
      defaultValue={locale}
      size="small"
      sx={{
        ...sx,
        backgroundColor: 'rgba(225, 237, 251, 0.3)',
        borderRadius: 4,
        color: 'inherit',
      }}
    >
      <MenuItem value="en">{t('english')}</MenuItem>
      <MenuItem value="tr">{t('turkish')}</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
