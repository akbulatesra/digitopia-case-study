'use client';
import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface ErrorAlertProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      sx={{
        top: '0px !important',
        left: '0 !important',
        right: '0 !important',
        bottom: '0 !important',
        zIndex: 999999,
      }}
      onClose={(_, reason) => {
        if (reason !== 'clickaway') {
          onClose();
        }
      }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{
          minWidth: 200,
          wordBreak: 'break-word',
          background: '#92041c',
          margin: 'auto',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
