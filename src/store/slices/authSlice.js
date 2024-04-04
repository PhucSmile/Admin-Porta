import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { STORAGE_KEY } from 'constants/common';
import authApi from 'api/authApi';

export const doLogin = createAsyncThunk('auth/login', async (data) => {
  const result = await authApi.login(data);
  localStorage.setItem(STORAGE_KEY.TOKEN, result.accessToken);

  return result;
});

export const doCheckAuth = createAsyncThunk(
  'auth/checkAuth',
  async (payload) => {
    const result = await authApi.verifyToken(payload);

    return result;
  },
);

export const doGetInfo = createAsyncThunk('auth/getInfo', async () => {
  const userInfo = await authApi.getInfo();

  return userInfo;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    doLogout: (state) => {
      localStorage.removeItem(STORAGE_KEY.TOKEN);

      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [doLogin.fulfilled]: (state, action) => {
      state.user = action.payload?.user;
      state.isLoggedIn = true;
    },
    [doCheckAuth.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    [doGetInfo.fulfilled]: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const getCurrentUser = (state) => state.auth.user;

const { actions, reducer } = authSlice;
export const { doLogout } = actions;
export default reducer;
