import { createSlice } from '@reduxjs/toolkit';
import { deviceTypeApi } from './DeviceTypeApi';
import { DeviceType } from '../types';
import { ViewType } from 'modules/main/types';

interface DeviceTypeState {
  types: ViewType[];
  isLoading: boolean;
  error: string;
}

const initialState: DeviceTypeState = {
  types: [],
  isLoading: false,
  error: '',
};

const deviceTypeSlice = createSlice({
  name: 'deviceType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      deviceTypeApi.endpoints.getAllDeviceTypes.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.types = payload;
      },
    );
    builder.addMatcher(deviceTypeApi.endpoints.deleteDeviceType.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.types = state.types.filter((item) => item.id !== payload);
    });
    builder.addMatcher(deviceTypeApi.endpoints.createDeviceType.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.types.push(payload);
    });
  },
});

export default deviceTypeSlice.reducer;
