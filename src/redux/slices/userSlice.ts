import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  organizationId: string | null;
  organizationRole: string | null;
  name: string | null;
  familyName: string | null;
  role: string | null;
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  organizationId: null,
  organizationRole: null,
  name: null,
  familyName: null,
  role: null,
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
      state.organizationId = null;
      state.name = null;
      state.idToken = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
