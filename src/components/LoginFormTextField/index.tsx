import { styled, TextField } from '@mui/material';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface LoginFormTextFieldProps {
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  label: string;
  type?: string;
  slotProps?: any;
  registerLabel: string;
}

const StyledLoginFormTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'inherit',
  },
  '& .MuiInputLabel-root': {
    color: 'inherit',
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: 'inherit',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'inherit',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
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
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#747578',
  },
  '& .MuiInputBase-root:after': {
    borderBottomColor: '#747578',
  },
});

const LoginFormTextField = ({
  error,
  label,
  registerLabel,
  type = 'text',
  slotProps,
  register,
}: LoginFormTextFieldProps) => {
  return (
    <StyledLoginFormTextField
      label={label}
      variant="standard"
      error={!!error}
      type={type}
      margin="dense"
      {...register(registerLabel)}
      slotProps={slotProps}
      helperText={
        <span
          style={{
            position: 'absolute',
            right: 0,
          }}
        >
          {error?.message}
        </span>
      }
    />
  );
};
export default LoginFormTextField;
