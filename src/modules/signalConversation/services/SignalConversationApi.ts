import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  SignalConversationType,
  DeleteSignalConversationPayload,
  CreateSignalConversationPayload,
} from "../types";

export const signalConversationApi = createApi({
  reducerPath: "signalConversation",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createSignalConversation: build.mutation<
      SignalConversationType,
      CreateSignalConversationPayload
    >({
      query: (payload) => ({
        method: Method.POST,
        url: "/signal-conversation",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllSignalConversations: build.mutation<SignalConversationType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/signal-conversation",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteSignalConversation: build.mutation<
      number,
      DeleteSignalConversationPayload
    >({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/signal-conversation",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});
