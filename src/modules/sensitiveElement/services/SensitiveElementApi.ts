import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  SensitiveElementType,
  DeleteSensitiveElementPayload,
  CreateSensitiveElementPayload,
} from "../types";

export const sensitiveElementApi = createApi({
  reducerPath: "sensitiveElement",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createSensitiveElement: build.mutation<
      SensitiveElementType,
      CreateSensitiveElementPayload
    >({
      query: (payload) => ({
        method: Method.POST,
        url: "/sensitive-element",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllSensitiveElements: build.mutation<SensitiveElementType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/sensitive-element",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteSensitiveElement: build.mutation<
      number,
      DeleteSensitiveElementPayload
    >({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/sensitive-element",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});
