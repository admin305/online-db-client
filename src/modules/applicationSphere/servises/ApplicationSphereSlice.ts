import { createSlice } from "@reduxjs/toolkit";
import { applicationSphereApi } from "./ApplicationSphereApi";
import { ApplicationSphereType } from "../types";

interface ApplicationSphereState {
  applicationSpheres: ApplicationSphereType[];
  isLoading: boolean;
  error: string;
}

const initialState: ApplicationSphereState = {
  applicationSpheres: [],
  isLoading: false,
  error: "",
};

const applicationSphereSlice = createSlice({
  name: "applicationSphere",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      applicationSphereApi.endpoints.getAllApplicationSpheres.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.applicationSpheres = payload;
      }
    );
    builder.addMatcher(
      applicationSphereApi.endpoints.deleteApplicationSphere.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.applicationSpheres = state.applicationSpheres.filter(
          (item) => item.id !== payload
        );
      }
    );
    builder.addMatcher(
      applicationSphereApi.endpoints.createApplicationSphere.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.applicationSpheres.push(payload);
      }
    );
  },
});

export default applicationSphereSlice.reducer;
