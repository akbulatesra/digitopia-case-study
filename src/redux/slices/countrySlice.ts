import { CountryListResponseModel } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryState {
  countries: CountryListResponseModel[];
}

const initialState: CountryState = {
  countries: [],
};

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (
      state,
      action: PayloadAction<CountryListResponseModel[]>
    ) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
