import { useEffect, useState } from 'react';

const useErrorListener = (error: unknown) => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      if (Array.isArray(error)) {
        const combinedMessage = error
          .map((err) => {
            if (typeof err === 'string') {
              return err;
            } else if (
              typeof err === 'object' &&
              err !== null &&
              'data' in err
            ) {
              return (err as { data: string }).data;
            } else {
              return 'An unexpected error occurred.';
            }
          })
          .join(' | ');
        setMessage(combinedMessage);
      } else {
        switch (typeof error) {
          case 'string':
            setMessage(error);
            break;
          case 'object':
            if (error && 'data' in error) {
              setMessage((error as { data: string }).data);
            } else {
              setMessage('An unexpected error occurred.');
            }
            break;
          default:
            setMessage('An unexpected error occurred.');
        }
      }
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };

  return { message, open, handleClose };
};

export default useErrorListener;
