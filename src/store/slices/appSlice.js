import { createSlice } from '@reduxjs/toolkit';
import { LOCALE } from 'constants/common';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentLocale: LOCALE.VIETNAMESE,
  },
  reducers: {
    doSwitchLocale(state, action) {
      state.currentLocale = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;
export const { doSwitchLocale } = actions;
export default reducer;
