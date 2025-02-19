import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/user/userSlice";
import modalReducer from "../reducer/eventModal/eventModalSlice";
import { userApi } from "../reducer/user/userApiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
