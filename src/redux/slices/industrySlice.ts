import { IndustryListResponseModel } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IndustryState {
  industries: IndustryListResponseModel[];
}

const initialState: IndustryState = {
  industries: [],
};

const industrySlice = createSlice({
  name: 'industries',
  initialState,
  reducers: {
    setIndustries: (
      state,
      action: PayloadAction<IndustryListResponseModel[]>
    ) => {
      state.industries = action.payload;
    },
  },
});

export const { setIndustries } = industrySlice.actions;
export default industrySlice.reducer;
