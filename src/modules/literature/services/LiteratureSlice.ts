import { createSlice } from "@reduxjs/toolkit";
import { literatureApi } from "./LiteratureApi";
import { LiteratureType } from "../types";

interface LiteratureState {
  literatures: LiteratureType[];
  isLoading: boolean;
  error: string;
}

const initialState: LiteratureState = {
  literatures: [],
  isLoading: false,
  error: "",
};

const literatureSlice = createSlice({
  name: "literature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      literatureApi.endpoints.getAllLiteratures.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.literatures = payload;
      }
    );
    builder.addMatcher(
      literatureApi.endpoints.deleteLiterature.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.literatures = state.literatures.filter(
          (item) => item.id !== payload
        );
      }
    );
    builder.addMatcher(
      literatureApi.endpoints.createLiterature.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.literatures.push(payload);
      }
    );
  },
});

export default literatureSlice.reducer;
