import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models/IUser';
import { IRole } from 'models/IRole';
import { adminApi } from './AdminApi';

interface UserState {
  users: IUser[];
  roles: IRole[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  roles: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(adminApi.endpoints.getAllUser.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.users = payload;
    });
    builder.addMatcher(adminApi.endpoints.deleteUser.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.users = state.users.filter((item) => item.id !== payload);
    });
    builder.addMatcher(adminApi.endpoints.getAllRoles.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.roles = payload;
    });
    builder.addMatcher(adminApi.endpoints.setUserRole.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.users = state.users.map((item) =>
        item.id === payload.id ? { ...item, roles: [payload.role] } : item,
      );
    });
    // [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.users = action.payload;
    // },
    // [fetchUsers.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [registrationUser.fulfilled.type]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = "";
    //   console.log(action);
    // },
    // [registrationUser.pending.type]: (state) => {
    //   console.log("pending");
    //   state.isLoading = true;
    // },
    // [registrationUser.rejected.type]: (
    //   state,
    //   action: PayloadAction<string>
    // ) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    //   console.log(action);
    // },
    // [getAllUsers.fulfilled.type]: (state, action: any) => {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.users = action.payload;
    // },
    // [getAllUsers.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [getAllUsers.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export default userSlice.reducer;
