import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  ApplicationSphereType,
  ApplicationSphereResponse,
  CreateApplicationSpherePayload,
  DeleteApplicationSpherePayload,
} from "../types";

export const applicationSphereApi = createApi({
  reducerPath: "applicationSphere",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createApplicationSphere: build.mutation<
      ApplicationSphereResponse,
      CreateApplicationSpherePayload
    >({
      query: (payload) => ({
        method: Method.POST,
        url: "/application-sphere",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllApplicationSpheres: build.mutation<ApplicationSphereType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/application-sphere",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteApplicationSphere: build.mutation<
      number,
      DeleteApplicationSpherePayload
    >({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/application-sphere",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});
