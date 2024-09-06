import { useEffect, useState } from 'react';

const useErrorListener = (error: unknown) => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error) {
      switch (typeof error) {
        case 'string':
          setMessage(error);
          break;
        case 'object':
          if ('data' in error && error) {
            setMessage(error.data as string);
          } else {
            setMessage('An unexpected error occurred.');
          }
          break;
        default:
          setMessage('An unexpected error occurred.');
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
