import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userReducer from "../features/userSlice";

const reducers = combineReducers({
  user: userReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});


export default store;