import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
