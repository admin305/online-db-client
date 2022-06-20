import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL, Method, AuthResponse } from 'types';
import { IUser } from 'models/IUser';
import { IRole, AddRoleResponse, AddRolePayload } from 'models/IRole';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllUser: build.mutation<IUser[], void>({
      query: () => ({
        method: Method.GET,
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: '/users',
      }),
    }),
    setUserRole: build.mutation<AddRolePayload, AddRoleResponse>({
      query: (payload) => ({
        method: Method.POST,
        url: '/users/role',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    getAllRoles: build.mutation<IRole[], void>({
      query: () => ({
        method: Method.GET,
        url: '/roles',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    deleteUser: build.mutation({
      query: (payload) => ({
        method: Method.DELETE,
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: '/users',
        body: payload,
      }),
    }),
  }),
});
