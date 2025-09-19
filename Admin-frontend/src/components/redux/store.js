import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import requestReducer from "./requestSlice.js"
import movieReducer from './movieSlice.js'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
//   whitelist: ["auth"], // sirf auth slice persist hoga
};

const rootReducer = combineReducers({
  auth: authReducer,
  request: requestReducer,
  movie: movieReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
