import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import layoutReducer from './slices/layoutSlice';

const persistConfig = {
  key: 'new_root',
  storage,
  version: 1,
  whitelist: ['app'],
  // blacklist: []
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  layout: layoutReducer,
});

const reducer = (state, action) => {
  // if (action.type === doLogout.type) {
  //   return rootReducer(
  //     { ...state, permission: { ...state.permission, currentRole: null } },
  //     action,
  //   );
  // }

  return rootReducer(state, action);
};

export default persistReducer(persistConfig, reducer);
