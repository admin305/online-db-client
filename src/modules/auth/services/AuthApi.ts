import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method, AuthPayload, AuthResponse } from "types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    authUser: build.mutation<AuthResponse, AuthPayload>({
      query: (payload) => ({
        method: Method.POST,
        url: "/auth/login",
        body: payload,
      }),
    }),
  }),
});
