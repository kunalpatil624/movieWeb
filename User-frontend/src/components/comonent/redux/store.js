import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import theaterReducer from "./theaterSlice"
import bookingReducer from './bookingsSlice'
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
import movieReducer from "./movieSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
//   whitelist: ["auth"], // sirf auth slice persist hoga
};

const rootReducer = combineReducers({
  auth: authReducer,
  movie:movieReducer,
  theater:theaterReducer,
  booking:bookingReducer,
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
