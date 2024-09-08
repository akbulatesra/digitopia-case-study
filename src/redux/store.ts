import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import { personalApi } from '../services';

const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  user: userReducer,
  [personalApi.reducerPath]: personalApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personalApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
