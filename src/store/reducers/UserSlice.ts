import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, ROLES } from "../../models/IUser";
import { fetchUsers, registrationUser, getAllUsers } from "./ActionCreators";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [registrationUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      console.log(action);
    },
    [registrationUser.pending.type]: (state) => {
      console.log("pending");
      state.isLoading = true;
    },
    [registrationUser.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action);
    },
    [getAllUsers.fulfilled.type]: (state, action: any) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    [getAllUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
