'use client';
import { store } from '@/app/redux/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface ProviderProps {
  children: ReactNode;
}

const ProviderComponent = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderComponent;
