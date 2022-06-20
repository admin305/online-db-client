import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL, Method } from 'types';
import { ControlType, DeleteControlTypePayload, CreateControlTypePayload } from '../types';

export const controlTypeApi = createApi({
  reducerPath: 'controlType',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createControlType: build.mutation<ControlType, CreateControlTypePayload>({
      query: (payload) => ({
        method: Method.POST,
        url: '/control-type',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    getAllControlTypes: build.mutation<ControlType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: '/control-type',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    deleteControlType: build.mutation<number, DeleteControlTypePayload>({
      query: (payload) => ({
        method: Method.DELETE,
        url: '/control-type',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
  }),
});
