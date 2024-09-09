'use client';
import { useAppSelector } from '@/redux/hook';
import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface BlurContainerProps {
  children: ReactNode;
}

const BlurContainer = ({ children }: BlurContainerProps) => {
  const { idToken } = useAppSelector((state) => state.user);

  if (idToken)
    return (
      <Box
        display="flex"
        width="100%"
        overflow="auto"
        sx={{
          backgroundColor: 'rgba(148, 163, 184, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            padding: 10,
            paddingTop: 14,
          }}
        >
          {children}
        </Container>
      </Box>
    );
  return (
    <Container
      maxWidth="sm"
      fixed
      sx={{
        margin: 'auto',
        height: 'auto',
        backgroundColor: 'rgba(148, 163, 184, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: 4,
        minHeight: '50vh',
        overflow: 'auto',
      }}
    >
      {children}
    </Container>
  );
};
export default BlurContainer;
