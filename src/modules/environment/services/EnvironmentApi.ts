import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  EnvironmentType,
  DeleteEnvironmentPayload,
  CreateEnvironmentPayload,
} from "../types";

export const environmentApi = createApi({
  reducerPath: "environment",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createEnvironment: build.mutation<EnvironmentType, CreateEnvironmentPayload>({
      query: (payload) => ({
        method: Method.POST,
        url: "/environment",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllEnvironments: build.mutation<EnvironmentType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/environment",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteEnvironment: build.mutation<number, DeleteEnvironmentPayload>({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/environment",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});