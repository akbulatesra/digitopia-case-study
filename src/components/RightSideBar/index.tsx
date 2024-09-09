import Drawer from '@mui/material/Drawer';
import { ReactNode } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, IconButton } from '@mui/material';

interface RightSidePanelProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const RightSidePanel = ({ children, isOpen, onClose }: RightSidePanelProps) => {
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
        aria-label="button for close right panel" //DÜZELT
      >
        <ExitToAppIcon sx={{ fill: 'black' }} />
      </IconButton>
      <Box mt={2} paddingX={2} paddingY={2} maxWidth={450}>
        {children}
      </Box>
    </Drawer>
  );
};
export default RightSidePanel;
