import axios from "axios";
import { IUser } from "models/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api, { API_URL } from "http/index";
import { UserRegistrationData, AuthPayload } from "types";

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить пользователей");
    }
  }
);

export const registrationUser = createAsyncThunk(
  "user/registration",
  async (userData: Partial<UserRegistrationData>, thunkApi) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/registration`,
        userData
      );

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось зарегистрироваться");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (loginData: AuthPayload, thunkApi) => {
    try {
      const response = await $api.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (e) {
      thunkApi.rejectWithValue("Не удалось авторизоваться");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkApi) => {
    try {
      const response = await $api.get("/users");

      return response.data;
    } catch (e) {
      thunkApi.rejectWithValue("Произошла ошибка при получении пользователей");
    }
  }
);
