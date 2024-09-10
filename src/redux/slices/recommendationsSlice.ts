import { ImpactRunDetailResponseModel } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecommendationsState {
  data: ImpactRunDetailResponseModel[];
}

const initialState: RecommendationsState = {
  data: [],
};

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setRecommendationsData(
      state,
      action: PayloadAction<ImpactRunDetailResponseModel[]>
    ) {
      state.data = action.payload;
    },
    updateRecommendationItem(
      state,
      action: PayloadAction<ImpactRunDetailResponseModel>
    ) {
      const updatedItem = action.payload;
      state.data = state.data.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    },
  },
});

export const { setRecommendationsData, updateRecommendationItem } =
  recommendationsSlice.actions;

export default recommendationsSlice.reducer;
