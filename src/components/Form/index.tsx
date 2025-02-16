'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { object, string } from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, IconButton, InputAdornment } from '@mui/material';
import {
  useLazyGetImpactRunDetailQuery,
  useLazyGetImpactRunListQuery,
  useLoginMutation,
} from '@/services';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginFormTextField from '../LoginFormTextField';
import useErrorListener from '@/hooks/useErrorListener';
import ErrorAlert from '../Error';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { setRecommendationsData } from '@/redux/slices/recommendationsSlice';

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations('page');

  const loginFormSchema = object({
    email: string().email(t('emailType')).required(t('emailRequired')),
    password: string().required(t('passwordRequired')),
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginFormSchema),
  });
  const [login, { isLoading, error }] = useLoginMutation();
  const [fetchImpactRunList] = useLazyGetImpactRunListQuery();
  const [trigger] = useLazyGetImpactRunDetailQuery();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await login({
      email: data.email,
      password: data.password,
    }).unwrap();
    localStorage.setItem('accessToken', response.accessToken.jwtToken);
    localStorage.setItem('idToken', response.idToken.jwtToken);
    localStorage.setItem('refreshToken', response.refreshToken.token);

    dispatch(
      setUser({
        idToken: response.idToken.jwtToken,
        accessToken: response.accessToken.jwtToken,
        refreshToken: response.refreshToken.token,
        organizationId: response.idToken.payload['custom:organizationId'],
        organizationRole: response.idToken.payload['custom:organizationRole'],
        role: response.idToken.payload['custom:role'],
        familyName: response.idToken.payload.family_name,
        name: response.idToken.payload.name,
      })
    );
    if (fetchImpactRunList) {
      const data = await fetchImpactRunList().unwrap();
      if (data?.[0]?.id) {
        const recommendationList = await trigger(data[0].id).unwrap();
        dispatch(setRecommendationsData(recommendationList));
      }
    }
    router.push('/home');
  };

  const { message, open, handleClose } = useErrorListener(error);

  return (
    <>
      <ErrorAlert message={message} onClose={handleClose} open={open} />
      <Box
        component="form"
        autoComplete="off"
        mb={4}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <LoginFormTextField
          label={t('email')}
          registerLabel="email"
          register={register}
          error={errors.email}
        />
        <LoginFormTextField
          label={t('password')}
          registerLabel="password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          error={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility sx={{ fill: 'white' }} />
                    ) : (
                      <VisibilityOff sx={{ fill: 'white' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: 'black', marginTop: 6 }}
          disabled={!!isLoading}
        >
          {t('login')}
        </Button>
      </Box>
    </>
  );
};

export default Form;
