import { styled, TextField } from '@mui/material';

export const LoginFormTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'black',
  },
  '& .MuiInputLabel-root': {
    color: 'black',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiFormHelperText-root': {
    color: '#f44336',
    textAlign: 'end',
    fontWeight: 'bold',
  },
  '& .MuiInput-underline.Mui-error:before': {
    borderBottomColor: '#f44336',
  },
  '& .MuiInput-underline.Mui-error:after': {
    borderBottomColor: '#f44336',
  },
});
