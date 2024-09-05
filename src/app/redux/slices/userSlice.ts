import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; name: string }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearUser(state) {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
