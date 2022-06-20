import { createSlice } from "@reduxjs/toolkit";
import { operationPrincipleApi } from "./OperationPrincipleApi";
import { OperationPrincipleType } from "../types";

interface OperationPrincipleState {
  principles: OperationPrincipleType[];
  isLoading: boolean;
  error: string;
}

const initialState: OperationPrincipleState = {
  principles: [],
  isLoading: false,
  error: "",
};

const operationPrincipleSlice = createSlice({
  name: "operationPrinciple",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      operationPrincipleApi.endpoints.getAllOperationPrinciples.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.principles = payload;
      }
    );
    builder.addMatcher(
      operationPrincipleApi.endpoints.deleteOperationPrinciple.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.principles = state.principles.filter(
          (item) => item.id !== payload
        );
      }
    );
    builder.addMatcher(
      operationPrincipleApi.endpoints.createOperationPrinciple.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.principles.push(payload);
      }
    );
  },
});

export default operationPrincipleSlice.reducer;
