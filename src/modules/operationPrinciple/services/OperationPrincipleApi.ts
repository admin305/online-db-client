import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  OperationPrincipleType,
  DeleteOperationPrinciplePayload,
  CreateOperationPrinciplePayload,
} from "../types";

export const operationPrincipleApi = createApi({
  reducerPath: "operationPrinciple",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createOperationPrinciple: build.mutation<OperationPrincipleType, CreateOperationPrinciplePayload>({
      query: (payload) => ({
        method: Method.POST,
        url: "/operation-principle",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllOperationPrinciples: build.mutation<OperationPrincipleType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/operation-principle",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteOperationPrinciple: build.mutation<number, DeleteOperationPrinciplePayload>({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/operation-principle",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});