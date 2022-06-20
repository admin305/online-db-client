import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, Method } from "types";
import {
  ProducerType,
  DeleteProducerPayload,
  CreateProducerPayload,
} from "../types";

export const producerApi = createApi({
  reducerPath: "producer",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createProducer: build.mutation<ProducerType, CreateProducerPayload>({
      query: (payload) => ({
        method: Method.POST,
        url: "/producer",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    getAllProducers: build.mutation<ProducerType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: "/producer",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
    deleteProducer: build.mutation<number, DeleteProducerPayload>({
      query: (payload) => ({
        method: Method.DELETE,
        url: "/producer",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }),
    }),
  }),
});
