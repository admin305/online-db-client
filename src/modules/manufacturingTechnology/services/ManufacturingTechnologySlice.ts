import { createSlice } from "@reduxjs/toolkit";
import { manufacturingTechnologyApi } from "./ManufacturingTechnologyApi";
import { ManufacturingTechnologyType } from "../types";

interface ManufacturingTechnologyState {
  manufacturingTechnologys: ManufacturingTechnologyType[];
  isLoading: boolean;
  error: string;
}

const initialState: ManufacturingTechnologyState = {
  manufacturingTechnologys: [],
  isLoading: false,
  error: "",
};

const manufacturingTechnologySlice = createSlice({
  name: "literature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      manufacturingTechnologyApi.endpoints.getAllManufacturingTechnologys.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.manufacturingTechnologys = payload;
      }
    );
    builder.addMatcher(
      manufacturingTechnologyApi.endpoints.deleteManufacturingTechnology.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.manufacturingTechnologys = state.manufacturingTechnologys.filter(
          (item) => item.id !== payload
        );
      }
    );
    builder.addMatcher(
      manufacturingTechnologyApi.endpoints.createManufacturingTechnology.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.manufacturingTechnologys.push(payload);
      }
    );
  },
});

export default manufacturingTechnologySlice.reducer;
