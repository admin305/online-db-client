import { createSlice } from '@reduxjs/toolkit';
import { mainApi } from './MainApi';
import { Sensor, Device } from '../types';

interface MainState {
  sensors: Sensor[];
  devices: Device[];
  isLoading: boolean;
  error: string;
}

const initialState: MainState = {
  sensors: [],
  devices: [],
  isLoading: false,
  error: '',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(mainApi.endpoints.getAllSensors.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.sensors = payload;
    });
    builder.addMatcher(mainApi.endpoints.getAllDevices.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.devices = payload;
    });
    builder.addMatcher(mainApi.endpoints.removeSensor.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.sensors = state.sensors.filter((item) => item.id !== payload);
    });
  },
});

export default mainSlice.reducer;

export const getSensor = (sensors: Sensor[], id: number): Sensor[] =>
  sensors.filter((item) => item.id === id);

export const getDevice = (devices: Device[], id: number): Device[] =>
  devices.filter((item) => item.id === id);
