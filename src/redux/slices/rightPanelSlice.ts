import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RightPanelState {
  open: boolean | undefined;
}

const initialState: RightPanelState = {
  open: true,
};

const rightPanelSlice = createSlice({
  name: 'rightPanel',
  initialState,
  reducers: {
    setRightPanel(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export const { setRightPanel } = rightPanelSlice.actions;
export default rightPanelSlice.reducer;
