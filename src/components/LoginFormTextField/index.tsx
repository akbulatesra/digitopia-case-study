import { FieldError, UseFormRegister } from 'react-hook-form';
import { StyledLoginFormTextField } from '../StyledItems';

interface LoginFormTextFieldProps {
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  label: string;
  type?: string;
  slotProps?: any;
  registerLabel: string;
}

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
