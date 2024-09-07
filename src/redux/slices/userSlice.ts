import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id?: string | null;
  name?: string | null;
  idToken?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  idToken: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.idToken = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
