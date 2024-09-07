import { Box } from '@mui/material';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ReactNode } from 'react';

const NonAuthLanguageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box position="relative" display="flex" width="100%">
      <LanguageSwitcher sx={{ position: 'absolute', right: 16, top: 16 }} />
      {children}
    </Box>
  );
};
export default NonAuthLanguageContainer;
