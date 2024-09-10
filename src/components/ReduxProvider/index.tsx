'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

interface ProviderProps {
  children: ReactNode;
}

const ReduxProviderComponent = ({ children }: ProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProviderComponent;
