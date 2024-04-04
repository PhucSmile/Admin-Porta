import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    breadcrumbs: [],
  },
  reducers: {
    setBreadcrumbs(state, action) {
      state.breadcrumbs = action.payload;
    },
    forceBreadcrumbs(state, action) {
      state.breadcrumbs = [...state.breadcrumbs, ...action.payload];
    },
  },
});

export const getBreadcrumbs = (state) => state.layout.breadcrumbs;

const { actions, reducer } = authSlice;
export const { setBreadcrumbs, forceBreadcrumbs } = actions;
export default reducer;
