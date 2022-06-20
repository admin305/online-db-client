import { createSlice } from '@reduxjs/toolkit';
import { environmentApi } from './EnvironmentApi';
import { EnvironmentType } from '../types';

interface EnvironmentState {
  environments: EnvironmentType[];
  isLoading: boolean;
  error: string;
}

const initialState: EnvironmentState = {
  environments: [],
  isLoading: false,
  error: '',
};

const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      environmentApi.endpoints.getAllEnvironments.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.environments = payload;
      },
    );
    builder.addMatcher(
      environmentApi.endpoints.deleteEnvironment.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.environments = state.environments.filter((item) => item.id !== payload);
      },
    );
    builder.addMatcher(
      environmentApi.endpoints.createEnvironment.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.environments.push(payload);
      },
    );
  },
});

export default environmentSlice.reducer;
