import { createSlice } from '@reduxjs/toolkit';
import { controlTypeApi } from './ControlTypeApi';
import { ControlType } from '../types';

interface ControlTypeState {
  controlTypes: ControlType[];
  isLoading: boolean;
  error: string;
}

const initialState: ControlTypeState = {
  controlTypes: [],
  isLoading: false,
  error: '',
};

const controlTypeSlice = createSlice({
  name: 'controlType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      controlTypeApi.endpoints.getAllControlTypes.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.controlTypes = payload;
      },
    );
    builder.addMatcher(
      controlTypeApi.endpoints.deleteControlType.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.controlTypes = state.controlTypes.filter((item) => item.id !== payload);
      },
    );
    builder.addMatcher(
      controlTypeApi.endpoints.createControlType.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.controlTypes.push(payload);
      },
    );
  },
});

export default controlTypeSlice.reducer;
