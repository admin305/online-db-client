import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  LiteratureType,
  DeleteLiteraturePayload,
  CreateLiteraturePayload,
} from "../types";

export const literatureApi = createApi({
  reducerPath: "literature",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createLiterature: build.mutation<LiteratureType, CreateLiteraturePayload>({
      query: (payload) => ({
        method: Method.POST,
        url: "/literature",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllLiteratures: build.mutation<LiteratureType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/literature",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteLiterature: build.mutation<number, DeleteLiteraturePayload>({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/literature",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});
