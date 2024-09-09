import { useAppSelector } from '@/redux/hook';
import Drawer from '@mui/material/Drawer';
import { ReactNode } from 'react';

const RightSidePanel = ({ children }: { children: ReactNode }) => {
  const isOpen = useAppSelector((state) => state.rightPanel.open);
  return (
    <Drawer anchor="right" open={!isOpen}>
      {children}
    </Drawer>
  );
};
export default RightSidePanel;
