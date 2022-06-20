import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL, Method, AuthPayload, AuthResponse } from 'types';
import { Sensor, RemoveSensor, CreateSensorPayload, Device, RemoveDevice, CreateDevicePayload } from '../types';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    authUser: build.mutation<AuthResponse, AuthPayload>({
      query: (payload) => ({
        method: Method.POST,
        url: '/',
        body: payload,
      }),
    }),
    getAllSensors: build.mutation<Sensor[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: '/sensors',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    getAllDevices: build.mutation<Device[], void>({
      query: (payload) => ({
        method: Method.GET,
        url: '/devices',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    removeSensor: build.mutation<number, RemoveSensor>({
      query: (payload) => ({
        method: Method.DELETE,
        url: '/sensors',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    removeDevice: build.mutation<number, RemoveDevice>({
      query: (payload) => ({
        method: Method.DELETE,
        url: '/devices',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    createSensor: build.mutation<Sensor, CreateSensorPayload>({
      query: (payload) => ({
        method: Method.POST,
        url: '/sensors',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
    createDevice: build.mutation<Device, CreateDevicePayload>({
      query: (payload) => ({
        method: Method.POST,
        url: '/devices',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      }),
    }),
  }),
});
