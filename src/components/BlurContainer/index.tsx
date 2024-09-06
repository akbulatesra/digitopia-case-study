import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface BlurContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const BlurContainer = ({ children, maxWidth = 'md' }: BlurContainerProps) => {
  return (
    <Container
      maxWidth={maxWidth}
      fixed
      sx={{
        margin: 'auto',
        height: 'auto',
        backgroundColor: 'rgba(148, 163, 184, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: 4,
      }}
    >
      {children}
    </Container>
  );
};
export default BlurContainer;
