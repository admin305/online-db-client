import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  ManufacturingTechnologyType,
  DeleteManufacturingTechnologyPayload,
  CreateManufacturingTechnologyPayload,
} from "../types";

export const manufacturingTechnologyApi = createApi({
  reducerPath: "manufacturingTechnology",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createManufacturingTechnology: build.mutation<
      ManufacturingTechnologyType,
      CreateManufacturingTechnologyPayload
    >({
      query: (payload) => ({
        method: Method.POST,
        url: "/manufacturing-technology",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllManufacturingTechnologys: build.mutation<
      ManufacturingTechnologyType[],
      void
    >({
      query: (payload) => ({
        method: Method.GET,
        url: "/manufacturing-technology",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteManufacturingTechnology: build.mutation<
      number,
      DeleteManufacturingTechnologyPayload
    >({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/manufacturing-technology",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});
