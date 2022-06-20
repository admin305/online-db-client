import { createSlice } from "@reduxjs/toolkit";
import { outputSignalApi } from "./OutputSignalApi";
import { OutputSignalType } from "../types";

interface OutputSignalState {
  outputSignals: OutputSignalType[];
  isLoading: boolean;
  error: string;
}

const initialState: OutputSignalState = {
  outputSignals: [],
  isLoading: false,
  error: "",
};

const outputSignalSlice = createSlice({
  name: "outputSignal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      outputSignalApi.endpoints.getAllOutputSignals.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.outputSignals = payload;
      }
    );
    builder.addMatcher(
      outputSignalApi.endpoints.deleteOutputSignal.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.outputSignals = state.outputSignals.filter(
          (item) => item.id !== payload
        );
      }
    );
    builder.addMatcher(
      outputSignalApi.endpoints.createOutputSignal.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.outputSignals.push(payload);
      }
    );
  },
});

export default outputSignalSlice.reducer;
