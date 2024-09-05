import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import { personalApi } from '@/services';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    theme: themeReducer,
    user: userReducer,
    [personalApi.reducerPath]: personalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
