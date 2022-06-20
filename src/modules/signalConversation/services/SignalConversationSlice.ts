import { createSlice } from "@reduxjs/toolkit";
import { signalConversationApi } from "./SignalConversationApi";
import { SignalConversationType } from "../types";

interface SignalConversationState {
  signalConversations: SignalConversationType[];
  isLoading: boolean;
  error: string;
}

const initialState: SignalConversationState = {
  signalConversations: [],
  isLoading: false,
  error: "",
};

const signalConversationSlice = createSlice({
  name: "signalConversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      signalConversationApi.endpoints.getAllSignalConversations.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.signalConversations = payload;
      }
    );
    builder.addMatcher(
      signalConversationApi.endpoints.deleteSignalConversation.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.signalConversations = state.signalConversations.filter(
          (item) => item.id !== payload
        );
      }
    );
    builder.addMatcher(
      signalConversationApi.endpoints.createSignalConversation.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        state.signalConversations.push(payload);
      }
    );
  },
});

export default signalConversationSlice.reducer;
