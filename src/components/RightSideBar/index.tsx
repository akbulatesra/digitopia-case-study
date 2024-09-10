import Drawer from '@mui/material/Drawer';
import { ReactNode } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, IconButton } from '@mui/material';
import useResponsive from '@/hooks/useResponsive';

interface RightSidePanelProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const RightSidePanel = ({ children, isOpen, onClose }: RightSidePanelProps) => {
  const isSmDown = useResponsive('sm', 'down');

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{ position: 'relative' }}
    >
      <IconButton
        sx={{ position: 'absolute', right: 0 }}
        size="large"
        onClick={handleClose}
      >
        <ExitToAppIcon sx={{ fill: 'black' }} />
      </IconButton>
      <Box
        mt={2}
        paddingX={isSmDown ? 1 : 2}
        paddingY={isSmDown ? 4 : 2}
        maxWidth={isSmDown ? 320 : 450}
        display="flex"
        height="100%"
      >
        {children}
      </Box>
    </Drawer>
  );
};
export default RightSidePanel;
