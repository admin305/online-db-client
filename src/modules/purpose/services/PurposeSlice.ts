import { createSlice } from '@reduxjs/toolkit';
import { purposeApi } from './PurposeApi';
import { PurposeType } from '../types';

interface PurposeState {
  purposes: PurposeType[];
  isLoading: boolean;
  error: string;
}

const initialState: PurposeState = {
  purposes: [],
  isLoading: false,
  error: '',
};

const purposeSlice = createSlice({
  name: 'purpose',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(purposeApi.endpoints.getAllPurpose.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.purposes = payload;
    });
    builder.addMatcher(purposeApi.endpoints.deletePurpose.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.purposes = state.purposes.filter((item) => item.id !== payload);
    });
    builder.addMatcher(purposeApi.endpoints.createPurpose.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.purposes.push(payload);
    });
  },
});

export default purposeSlice.reducer;
