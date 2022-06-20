import { createSlice } from "@reduxjs/toolkit";
import { sensitiveElementApi } from "./SensitiveElementApi";
import { SensitiveElementType } from "../types";

interface SensitiveElementState {
  sensitiveElements: SensitiveElementType[];
  isLoading: boolean;
  error: string;
}

const initialState: SensitiveElementState = {
  sensitiveElements: [],
  isLoading: false,
  error: "",
};

const sensitiveElementSlice = createSlice({
  name: "sensitiveElement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      sensitiveElementApi.endpoints.getAllSensitiveElements.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.sensitiveElements = payload;
      }
    );
    builder.addMatcher(
      sensitiveElementApi.endpoints.deleteSensitiveElement.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.sensitiveElements = state.sensitiveElements.filter(
          (item) => item.id !== payload
        );
      }
    );
    builder.addMatcher(
      sensitiveElementApi.endpoints.createSensitiveElement.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.sensitiveElements.push(payload);
      }
    );
  },
});

export default sensitiveElementSlice.reducer;
