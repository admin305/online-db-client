export const BASE_URL = 'http://localhost:5000';

export enum Method {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export type UserRegistrationData = {
  name: string;
  sername: string;
  login: string;
  email: string;
  password: string;
};

export const IS_OBLIGATORY_FIELD_ERROR = 'Обязательное поле';
