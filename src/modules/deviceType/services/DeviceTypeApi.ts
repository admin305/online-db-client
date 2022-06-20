import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ViewType } from 'modules/main/types';

import { BASE_URL, Method } from 'types';
import { DeleteDeviceType, CreateDeviceType } from '../types';

export const deviceTypeApi = createApi({
  reducerPath: 'deviceType',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    createDeviceType: build.mutation<ViewType, CreateDeviceType>({
      query: (payload) => ({
        method: Method.POST,
        url: '/type',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    getAllDeviceTypes: build.mutation<ViewType[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: '/type',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    deleteDeviceType: build.mutation<number, DeleteDeviceType>({
      query: (payload) => ({
        method: Method.DELETE,
        url: '/type',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
  }),
});
