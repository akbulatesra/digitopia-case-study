'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { object, string } from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { useLoginMutation } from '@/services';

const loginFormSchema = object({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
});

type Inputs = {
  username: string;
  password: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginFormSchema),
  });
  const [login, result] = useLoginMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login({ username: data.username, password: data.password });
    console.log(result);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Username"
        variant="standard"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" className="bg-black mt-8">
        Login
      </Button>
    </Box>
  );
};

export default Form;
