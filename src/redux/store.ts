import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import platformReducer from "./slices/platformSlice";

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistCombineReducers(
  persistConfig, 
  {
    platform: platformReducer
  }
); 

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);
export default store;
