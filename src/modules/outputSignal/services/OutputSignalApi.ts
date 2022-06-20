import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  OutputSignalType,
  DeleteOutputSignalPayload,
  CreateOutputSignalPayload,
} from "../types";

export const outputSignalApi = createApi({
  reducerPath: "outputSignal",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createOutputSignal: build.mutation<
      OutputSignalType,
      CreateOutputSignalPayload
    >({
      query: (payload) => ({
        method: Method.POST,
        url: "/output-signal",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllOutputSignals: build.mutation<OutputSignalType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/output-signal",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteOutputSignal: build.mutation<number, DeleteOutputSignalPayload>({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/output-signal",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});
