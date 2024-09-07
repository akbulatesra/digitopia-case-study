import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  language: 'en' | 'tr' | 'ft';
}

const initialState: LanguageState = {
  language: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'en' | 'tr' | 'ft'>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
