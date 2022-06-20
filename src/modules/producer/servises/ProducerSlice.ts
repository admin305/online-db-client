import { createSlice } from "@reduxjs/toolkit";
import { producerApi } from "./ProducerApi";
import { ProducerType } from "../types";

interface ProducerState {
  producers: ProducerType[];
  isLoading: boolean;
  error: string;
}

const initialState: ProducerState = {
  producers: [],
  isLoading: false,
  error: "",
};

const producerSlice = createSlice({
  name: "producer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      producerApi.endpoints.getAllProducers.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.producers = payload;
      }
    );
    builder.addMatcher(
      producerApi.endpoints.deleteProducer.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.producers = state.producers.filter((item) => item.id !== payload);
      }
    );
    builder.addMatcher(
      producerApi.endpoints.createProducer.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.producers.push(payload);
      }
    );
  },
});

export default producerSlice.reducer;
