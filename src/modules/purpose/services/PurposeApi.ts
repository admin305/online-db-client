import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL, Method } from 'types';
import { PurposeType, DeletePurposePayload, CreatePurposePayload } from '../types';

export const purposeApi = createApi({
  reducerPath: 'purpose',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createPurpose: build.mutation<PurposeType, CreatePurposePayload>({
      query: (payload) => ({
        method: Method.POST,
        url: '/purpose',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    getAllPurpose: build.mutation<PurposeType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: '/purpose',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    deletePurpose: build.mutation<number, DeletePurposePayload>({
      query: (payload) => ({
        method: Method.DELETE,
        url: '/purpose',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
  }),
});
