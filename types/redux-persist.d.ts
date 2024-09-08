declare module 'redux-persist/integration/react' {
  import { ComponentType } from 'react';
  import { Persistor } from 'redux-persist';

  export interface PersistGateProps {
    persistor: Persistor;
    loading?: React.ReactNode;
  }

  export const PersistGate: ComponentType<PersistGateProps>;
}
