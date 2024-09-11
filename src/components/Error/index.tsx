'use client';
import React, { createContext, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import useErrorListener from '@/hooks/useErrorListener';

type ErrorHandlingContextType = {
  error: unknown;
  setError: (error: unknown) => void;
};

const ErrorHandlingContext = createContext<
  ErrorHandlingContextType | undefined
>(undefined);

const ErrorHandlingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = React.useState<unknown>(null);
  const { message, open, handleClose } = useErrorListener(error);

  return (
    <ErrorHandlingContext.Provider value={{ error, setError }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </ErrorHandlingContext.Provider>
  );
};

const useErrorHandling = () => {
  const context = useContext(ErrorHandlingContext);
  if (context === undefined) {
    throw new Error(
      'useErrorHandling must be used within a ErrorHandlingProvider'
    );
  }
  return context;
};

export { ErrorHandlingProvider, useErrorHandling };
